const init = db => {
    const products = require('../controllers/products')(db)
    const router = require('express').Router()

    router.get('/:id/slug', products.getProduct)

    return router
}

module.exports = init