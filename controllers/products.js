const init = db => {

    const product = require('../models/product')(db)
    const categories = require('../models/category')(db)

    const getProduct = async (req, res) => {
        const productOne = await product.getProductById(req.params.id)
        res.render('product-detail', {
            product: productOne
        })
    }

    const adminGetProducts= async (req, res) => {
        const products = await product.getProducts()
        res.render('admin/products/index', {
            products
        })
    }

    const adminCreateProduct = async (req, res) => {
        if (req.method === 'GET') {
            res.render('admin/products/create', {
                errors: [],
                form: {}
            })
        } else {
            try {
                await product.createProduct(req.body, req.file)
                res.redirect('/admin/produtos')
            } catch (err) {
                res.render('admin/products/create', {
                    errors: err.errors.fields,
                    form: req.body
                })
            }
        }
    }

    const adminRemoveProduct = async (req, res) => {
        await product.removeProduct(req.params.id)
        res.redirect('/admin/produtos')
    }

    const adminUpdateProduct = async (req, res) => {
        const productOne = await product.getProductById(req.params.id)
        if (req.method === 'GET') {
            res.render('admin/products/update', {
                errors: [],
                form: productOne,
            })
        } else {
            try {
                await product.updateProduct(req.params.id, req.body, req.file)
                res.redirect('/admin/produtos')
            } catch (err) {
                res.render('admin/products/update', {
                    errors: err.errors.fields,
                    form: req.body
                })
            }
        }
    }
    return {
        getProduct,
        adminGetProducts,
        adminCreateProduct,
        adminRemoveProduct,
        adminUpdateProduct
    }
}


module.exports = init