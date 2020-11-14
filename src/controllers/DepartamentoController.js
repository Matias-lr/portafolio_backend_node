const {create,select,update} = require('../models/Departamento')

exports.DepartamentoSelect = (req,res) =>{
    select()
    .then(response =>{
        res.status(200).json(response)
    })
    .catch(err => {
        res.statusMessage = 'no se ha podido consultar'
        res.status(406).json('no se ha podido insertar')
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
exports.DepartamentoUpdate = (req,res) => {
    if(req.body.length === 0){
        res.statusMessage = "body vacio crack"
        res.status(400).end()
    }
    string = []
    for(var i in req.body){
        if(req.body[i] != null && req.body[i] != '' && i.toLowerCase() !='activo'){
            string.push({columna:i,value:req.body[i]});
        }
    }
    json = {
        id:req.params.id,
        update:string
    }
    update(json)
    .then(response =>{
        switch (response){
            case 0:
                res.statusMessage = 'No se pudo realizar la actualizacion'
                res.status(500).json('No se pudo realizar la actualizacion')
            case 1:
                res.statusMessage = 'Registro acctualizado con exito!'
                res.status(200).json('Registro acctualizado con exito!')
        }
    })
}