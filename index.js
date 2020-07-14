
const db = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'devshop'
    }
})

const app = require('./app')(db)

const port = process.env.PORT || 3000
const user = require('./models/user')

db.on('query', query =>{
    console.log(query.sql)
})

user.initialUser(db)()
app.listen(port, err =>{
    if(err){
        console.log('Não foi possível iniciar o servidor')
    }else{
        console.log('DevShop server rodando...')
    }
})