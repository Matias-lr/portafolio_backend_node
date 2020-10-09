const {create, select, login} = require('../models/User')
const crypto = require('crypto')

module.exports.UserRegister = (req,res) =>{
    req.body.pass = crypto.createHmac('md5', process.env.ENCRYPTPASS).update(req.body.pass).digest().toString('base64');
    create(req.body)
    .then(response => {
        switch (response){
            case 0:
                res.status(401).json('no se ha podido insertar')
                break;
            case 1:
                res.status(200).json('se inserto correctamente')
                break;
            case 2:
                res.status(400).json('la request esta mal armada')
                break;
            case 3:
                res.status(402).json('email ya existe')
                break;
            default:
                res.status(404).json('not found')
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
                res.status(401).json('xdddddd')
            case 1:
                res.status(200).json(response.token)
                break;
            case 2:
                res.status(402).json('credenciales incorrectas intentelo de nuevo')
                break;
            default:
                res.status(400).json('f')
                break;
        }
    })
}
exports.User = (req,res)=>{
    res.status(200).json(req.user)
}