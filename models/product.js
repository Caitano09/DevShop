const init = db => {
    const slug = require('../utils/slug')
    const Joi = require('@hapi/joi')
    const validation = require('../utils/validation')
    const fs = require('fs')

    const createScheama = Joi.object({
        name: Joi.string().min(2).max(245).required(),
        description: Joi.string().min(5).required(),
        price: Joi.number().min(1).required(),
        available: Joi.number().min(1).required(),
        image: Joi.string().min(1).required(),
        categoryId: Joi.number().min(1).required()
    })

    const getPaginationParams = query => {
        const { currentPage, pages, pageSize } = query
        return {
            currentPage: currentPage ? parseInt(currentPage) : 0,
            pages: pages ? parseInt(pages) : 1,
            pageSize: pageSize ? parseInt(pageSize) : 10
        }
    }

    const getProducts = async () => {
        const products = await db('products').select('*')
        const productsWithSlug = products.map(product => {
            const newProduct = { ...product, slug: slug(product.name) }
            return newProduct
        })
        return productsWithSlug
    }

    const getProductsBycategoryId = async (id, query) => {
        const pagination = getPaginationParams(query)
        const products = await db('products')
            .select('*')
            .join('categories', 'categories.id', '=', 'products.categoryId').where('categoryId', id)
            .offset(pagination.pageSize * pagination.currentPage).limit(pagination.pageSize)

        const productsCount = await db('products')
            .select('*')
            .join('categories', 'categories.id', '=', 'products.categoryId').where('categoryId', id)
            .offset(pagination.pageSize * pagination.currentPage).limit(pagination.pageSize)
            .count('* as total')
            .first()

        pagination.total = productsCount.total
        pagination.totalPages = Math.ceil(productsCount.total / pagination.pageSize)
        return {
            data: products,
            pagination
        }
    }

    const getProductById = async (id) => {
        const product = await db('products').select('*').where('id', id)
        return product[0]
    }

    const createProduct = async (product, image) => {
        product.image = await validation.validateImage(image)
        const value = validation.validate(product, createScheama)
        await db('products').insert(value)
        return true
    }

    const removeProduct = async (id) => {
        await db('products').where({ id }).delete()
    }

    const updateProduct = async (id, product, image) => {

        const imagemBanco = await db('products').select('image as image').where('id', id)
        
        if (image) {
            const path = './'+imagemBanco[0].image
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                } 
            })
            product.image = await validation.validateImage(image)

        } else {
            product.image = imagemBanco[0].image
        }

        const value = validation.validate(product, createScheama)
        await db('products').where({ id }).update(value)
        return true
    }

    return {
        getProducts,
        getProductsBycategoryId,
        getProductById,
        createProduct,
        removeProduct,
        updateProduct
    }
}

module.exports = init