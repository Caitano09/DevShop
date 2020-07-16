const init = db => {
    const slug = require('../utils/slug')
    const Joi = require('@hapi/joi')
    const validation = require('../utils/validation')

    const createScheama = Joi.object({
        category: Joi.string().min(5).max(245).required(),
        description: Joi.string().min(5).required()
    })

    const getCategories = async () => {
        const categories = await db('categories').select('*')
        const categoriesWithSlug = categories.map(category => {
            const newCategory = { ...category, slug: slug(category.category) }
            return newCategory
        })
        return categoriesWithSlug
    }

    const getCategoryById = async (id) => {
        const category = await db('categories').select('*').where('id', id)
        return category[0]
    }

    const createCategory = async (category) => {
        const value = validation.validate(category, createScheama)
        await db('categories').insert(value)
        return true
    }

    const removeCategory = async (id) => {
        await db('categories').where({ id }).delete()
    }

    const updateCategory = async (id, category) => {
        const value = validation.validate(category, createScheama)
        await db('categories').where({ id }).update(value)
        return true
    }
    return {
        getCategories,
        getCategoryById,
        createCategory,
        removeCategory,
        updateCategory
    }
}

module.exports = init
