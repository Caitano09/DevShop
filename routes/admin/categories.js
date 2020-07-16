const init = db => {
    const router = require('express').Router()
    const categories = require('../../controllers/categories')(db)
    
    router.get('/', categories.adminGetCategories)
    router.get('/nova', categories.adminCreateCategory)
    router.post('/nova', categories.adminCreateCategory)
    router.get('/excluir/:id', categories.adminRemoveCategory)
    router.get('/editar/:id', categories.adminUpdateCategory)
    router.post('/editar/:id', categories.adminUpdateCategory)    
    return router    
}

module.exports = init 