var jwt = require('jsonwebtoken');
const db = require('../config/db')

exports.Authenticated = async (req,res,next) =>{
    if (!req.headers.authorization) {
        res.statusMessage = "Tu petición no tiene cabecera de autorización"
        return res.status(403).json("Tu petición no tiene cabecera de autorización");
    }
    var token = req.headers.authorization.split(" ")[1];
    var checkToken = await db.global_procedure('proce_token',token,0)
    if(checkToken == 0 || checkToken.baned == 1){
        res.statusMessage = "La sesion no es valida"
        return res.status(405).json("La sesion no es valida");
    }
    var payload = jwt.decode(token, process.env.ENCRYPT_PASS_JWT);
    req.user = payload;
    req.token = token
    next();
}
exports.isAdmin = async (req,res,next) =>{
    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, process.env.ENCRYPT_PASS_JWT);
    if(payload.tipoUsuario != 'Administrador'){
        res.statusMessage = "No tienes permiso para acceder a este recurso"
        return res.status(403).json("No tienes permiso para acceder a este recurso");
    }
    next();
}