const init = db => {
    const products = require('../controllers/products')
    const router = require('express').Router()

    router.get('/:id/slug', products.getProduct(db))

    return router
}

module.exports = init