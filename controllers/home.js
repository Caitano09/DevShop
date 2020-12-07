const init = db => {

    const product = require('../models/product')(db)

    const getIndex = async (req, res) => {
        const products = await product.getProducts()
        res.render('home', {products})
    }

    return{
        getIndex
    }
}

module.exports = init