const category = require('../models/category')
const product = require('../models/product')

const getCategories = db => async(req, res)=>{
    const categoryOne = await category.getCategoryById(db)(req.params.id)
    const products = await product.getProductsByCategoryId(db)(req.params.id)
    res.render('category', {
        products,
        category: categoryOne
    })
}

module.exports = {getCategories}