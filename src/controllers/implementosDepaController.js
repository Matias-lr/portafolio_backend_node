const {create,select,ImplementosByDepa} = require('../models/implementos_depa')

exports.ImplementoDepaCreate = (req,res) =>{
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
exports.ImplementosDepa = (req,res) =>{
    ImplementosByDepa(req.params.id)
    .then(response => {
        switch(response.status){
            case 0:
                res.statusMessage = 'Recopilar la informacion'
                res.status(401).json('Recopilar la informacion')
                break;
            case 1:
                res.status(200).json(response.object)
                break;
            default:
                res.statusMessage = 'no se ha podido insertar'
                res.status(404).json('no se ha podido insertar')
                break;
        }
    })
}
/*
exports.EdificioUpdate = (req,res) => {
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
                res.statusMessage = 'Registro actualizado con exito!'
                res.status(200).json('Registro actualizado con exito!')
        }
    })
}
exports.EdificioDelete = (req,res) =>{
    var json = {id:req.params.id}
    Delete(json)
    .then(response =>{
        switch (response){
            case 0:
                res.statusMessage = 'No se pudo realizar la eliminacion'
                res.status(500).json('No se pudo realizar la eliminacion')
            case 1:
                res.statusMessage = 'Registro eliminado con exito!'
                res.status(200).json('Registro eliminado con exito!')
        }
    })
}
exports.EdificioByNombre = (req,res) =>{
    edificioByNombre(req.params.nombreEdi)
    .then(response => {
        switch (response.status){
            case 0:
                res.statusMessage = 'No se encontro el objeto'
                res.status(500).json('No se encontro el objeto')
                break;
            case 1:
                res.status(200).json(response.object)
                break;
            default:
                break;
        }
    })
}*/