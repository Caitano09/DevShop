const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

const category = require('./models/category')
const product = require('./models/product')
const db = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'devshop'
    }
})


db.on('query', query =>{
    console.log(query.sql)
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res) =>{
    const categories = await category.getCategories(db)()
    res.render('home',{
        categories
    })
})

app.get('/categoria/:id/:slug', async(req, res)=>{
    const categories = await category.getCategories(db)()
    const products = await product.getProductsByCategoryId(db)(req.params.id)
    res.render('category', {
        products,
        categories
    })
})

app.listen(port, err =>{
    if(err){
        console.log('Não foi possível iniciar o servidor')
    }else{
        console.log('DevShop server rodando...')
    }
})