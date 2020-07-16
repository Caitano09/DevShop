const init = db => {
    const router = require('express').Router()
    const categories = require('../controllers/categories')(db)
    
    router.get('/:id/:slug', categories.getCategories)
    
    return router    
}

module.exports = init 