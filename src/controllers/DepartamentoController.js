const {create,select} = require('../models/Departamento')

exports.DepartamentoSelect = (req,res) =>{
    select()
    .then(response =>{
        res.status(200).json(response)
    })
}
exports.DepartamentoCreate = (req,res) =>{
    if(req.body.length === 0){
        res.statusMessage = "body vacio crack"
        res.status(400).end()
    }
    create(req.body)
    .then(response =>{
        switch(response){
            case 0:
                res.statusMessage = 'no se ha podido insertar'
                res.status(401).json('no se ha podido insertar')
                break;
            case 1:
                res.statusMessage = 'Se inserto correctamente'
                res.status(200).json('Se inserto correctamente')
                break;
            case 2:
                res.statusMessage = 'No existen los datos necesarios'
                res.status(500).json('No existen los datos necesarios')
                break;
            default:
                res.statusMessage = 'no se ha podido insertar'
                res.status(404).json('no se ha podido insertar')
                break;
        }
    })
    .catch(err => console.log(err))
}