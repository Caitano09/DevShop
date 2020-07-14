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

module.exports = {login, logout}