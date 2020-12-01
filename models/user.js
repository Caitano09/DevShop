const bcrypt = require('bcryptjs')

const generatePassHash = password =>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

const initialUser = db => async(id) => {
    const count = await db('users').count('id as total')
    if(count[0].total === 0){
        const user = {
            name: 'admin',
            email: 'admin@devshop.com.br',
            password: generatePassHash('12345'),
            emailChecked: true,
            created: new Date(),
            updated: new Date(),
            roles: 'admin,financeiro,cliente'
        }
        await db('users').insert(user)
    }
}

const login = db => async(email, password) =>{
    const user = await db('users').select('*').where('email', email)
    if(user.length === 0){
        throw new Error('Invalid user.')
    }
    
    if(!bcrypt.compareSync(password, user[0].password)){
        throw new Error('Invalid passsword.')
    }
    return user[0]
}

const registerUser = db => async(nameUser, emailUser, passswordUser) =>{
    console.log(nameUser, emailUser, passswordUser)
    const user = {
        name: nameUser,
        email: emailUser,
        password: generatePassHash(passswordUser),
        emailChecked: true,
        created: new Date(),
        updated: new Date(),
        roles: 'cliente'
    }
    console.log(user)
    await db('users').insert(user)
    return login(db)(emailUser, passswordUser)
}

const emailExist = db => async(email) =>{
    const user = await db('users').select('*').where('email', email)
    if(user.length !== 0){
        throw new Error('User already registered.')
    }    
}

module.exports = {
    initialUser,
    login,
    registerUser,
    emailExist
}
