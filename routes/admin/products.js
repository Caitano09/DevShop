const init = db =>{
    const router = require('express').Router()
    const products = require('../../controllers/products')(db)
    const multer = require('../../utils/multer')

    router.get('/', products.adminGetProducts)
    router.get('/nova', products.adminCreateProduct)
    router.post('/nova', multer.single('image') ,products.adminCreateProduct)
    router.get('/excluir/:id', products.adminRemoveProduct)
    router.get('/editar/:id', products.adminUpdateProduct)
    router.post('/editar/:id', multer.single('image'), products.adminUpdateProduct)    
    return router    
}

module.exports = init 