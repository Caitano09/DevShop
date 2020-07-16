const init = db => {

    const product = require('../models/product')(db)

    const getProduct = async (req, res) => {
        const productOne = await product.getProductById(req.params.id)
        res.render('product-detail', {
            product: productOne
        })
    }
    return {
        getProduct
    }
}
module.exports = init