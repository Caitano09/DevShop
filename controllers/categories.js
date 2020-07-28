const init = db => {

    const category = require('../models/category')(db)
    const product = require('../models/product')(db)

    const getCategories = async (req, res) => {
        const categoryOne = await category.getCategoryById(req.params.id,)
        const products = await product.getProductsByCategoryId(req.params.id, req.query)
        res.render('category', {
            products,
            category: categoryOne
        })
    }

    const adminGetCategories = async (req, res) => {
        const categories = await category.getCategories()
        res.render('admin/categories/index', {
            categories
        })
    }

    const adminCreateCategory = async (req, res) => {
        if (req.method === 'GET') {
            res.render('admin/categories/create', {
                errors: [],
                form: {}
            })
        } else {
            try {
                await category.createCategory(req.body)
                res.redirect('/admin/categorias')
            } catch (err) {
                res.render('admin/categories/create', {
                    errors: err.errors.fields,
                    form: req.body
                })
            }
        }
    }

    const adminRemoveCategory = async (req, res) => {
        await category.removeCategory(req.params.id)
        res.redirect('/admin/categorias')
    }

    const adminUpdateCategory = async (req, res) => {
        const categoryOne = await category.getCategoryById(req.params.id)
        if (req.method === 'GET') {
            res.render('admin/categories/update', {
                errors: [],
                form: categoryOne,
            })
        } else {
            try {
                await category.updateCategory(req.params.id, req.body)
                res.redirect('/admin/categorias')
            } catch (err) {
                res.render('admin/categories/update', {
                    errors: err.errors.fields,
                    form: req.body
                })
            }
        }
    }
    return {
        getCategories,
        adminGetCategories,
        adminCreateCategory,
        adminRemoveCategory,
        adminUpdateCategory
    }
}


module.exports = init