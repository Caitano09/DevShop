const e = require('express')

const init = db => {
    const auth = require('../../controllers/auth')
    const categories = require('./categories')
    const products = require('./products')

    const router = require('express').Router()

    //autorização
   router.use((req, res, next)=>{
        if(req.session.user){
            if(req.session.user.roles.indexOf('admin') < 0){
                res.redirect('/')
            }else{
                next()
            }
        }else{
            res.redirect('/login')
        }
    })
    router.get('/', (req, res)=> res.render('admin/index'))
    router.use('/categorias', categories(db))
    router.use('/produtos', products(db))

    return router
}

module.exports = init