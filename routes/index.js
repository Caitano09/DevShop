const init = db => {
    const home = require('../controllers/home')(db)
    const login = require('../controllers/login')
    const auth = require('../controllers/auth')
    const categories = require('./categories')
    const products = require('./products')
    const admin = require('./admin')

    const router = require('express').Router()

    //auth
    router.get('/', home.getIndex)
    router.get('/login', login.getLogin)
    router.post('/login', auth.login(db))
    router.get('/logout', auth.logout)
    router.get('/register', auth.register)
    router.post('/register', auth.registerUser(db))

    //router
    router.use('/admin', admin(db))
    router.use('/categoria', categories(db))
    router.use('/produto', products(db))

    return router
}

module.exports = init