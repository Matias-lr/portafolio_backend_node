var jwt = require('jsonwebtoken');

exports.Authenticated = (req,res,next) =>{
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({message: "Tu petición no tiene cabecera de autorización"});
        }
        var token = req.headers.authorization.split(" ")[1];
        var payload = jwt.decode(token, process.env.ENCRYPT_PASS_JWT);
        req.user = payload;
        req.token = token
        next();
    }