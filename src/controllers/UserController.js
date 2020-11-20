const {create, select, login,logout,getSesions} = require('../models/User')
const crypto = require('crypto')

module.exports.UserRegister = (req,res) =>{
    if(req.body.length === 0) {
        res.statusMessage = "body vacio crack"
        res.status(400).end()
      }
    req.body.contrasenia = crypto.createHmac('md5', process.env.ENCRYPTPASS).update(req.body.contrasenia).digest().toString('base64');
    create(req.body)
    .then(response => {
        switch (response){
            case 0:
                res.statusMessage = 'no se ha podido insertar'
                res.status(401).json('no se ha podido insertar')
                break;
            case 1:
                res.status(200).json('se inserto correctamente')
                break;
            case 2:
                res.statusMessage = 'la request esta mal armada'
                res.status(400).json('la request esta mal armada')
                break;
            case 3:
                res.statusMessage = 'email ya existe'
                res.status(408).json('email ya existe')
                break;
            default:
                res.statusMessage = 'not found'
                res.status(404).json('not found')
                break;
        }
    })
    .catch(err => console.log(err))
}

module.exports.UserSelect = (req,res) => {
    select()
    .then(response => {
        res.status(200).json(response)
    })
}
module.exports.UserLogin = (req,res) => {
    req.body.pass = crypto.createHmac('md5', process.env.ENCRYPTPASS).update(req.body.pass).digest().toString('base64');
    login(req.body)
    .then(response =>{
        switch (response.status){
            case 0:
                res.statusMessage = 'No se pudo crear la sesion'
                res.status(401).json('Credenciales incorrectas intentelo de nuevo')
            case 1:
                res.status(200).send(response.token)
                break;
            case 2:
                res.statusMessage = 'Credenciales incorrectas intentelo de nuevo'
                res.status(402).json('Credenciales incorrectas intentelo de nuevo')
            case 3:
                res.statusMessage = 'Usuario no encontrado'
                res.status(410).json('Usuario no encontrado')
                break;
            default:
                res.statusMessage = 'No se encontro error'
                res.status(400).json('Credenciales incorrectas intentelo de nuevo')
                break;
        }
    })
}
exports.User = (req,res)=>{
    res.status(200).json(req.user)
}
exports.UserLogout = (req,res) => {
    logout(req.token)
    .then(response =>{
        switch(response){
            case 0:
                res.statusMessage = 'No se a encontrado la sesion'
                res.status(404).json('No se a encontrado la sesion')
                break;
            case 1:
                res.status(200).json('Se a deslogeado con exito')
                break;
        }
    })
}
exports.TokenByUser = (req,res)=>{
    getSesions(req.token,req.user)
    .then(response =>{
        switch(response.status){
            case 0:
                res.statusMessage = 'No se a encontrado la sesion'
                res.status(404).json('No se a encontrado la sesion')
                break;
            case 1:
                res.status(200).json(response.sesions)
                break;
        }
    })
}