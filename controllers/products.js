const product = require('../models/product')

const getProduct = db => async(req, res)=>{
    const productOne = await product.getProductById(db)(req.params.id)
    res.render('product-detail', {
        product: productOne
    })
}

module.exports = {
    getProduct
}