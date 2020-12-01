const user = require('../models/user')

const login = db => async(req, res) =>{
    try{
    const usuario = await user.login(db)(req.body.email, req.body.pass)
    req.session.user = usuario
    res.redirect('/')
    }catch(err){
        res.send('Error: '+err)
    }
}

const logout = (req, res) =>{
    req.session.destroy(()=>{

    })
    res.redirect('/')
}

const register = (req, res) =>{
    res.render('register')
}

const registerUser = db => async(req, res) =>{
    try{
        await user.emailExist(db)(req.body.email)
        const usuario = await user.registerUser(db)(req.body.name, req.body.email, req.body.pass)
        req.session.user = usuario
        res.redirect('/')
    }catch(err){
        res.send('Error: '+err)
    }
}

module.exports = {login, logout, register, registerUser}