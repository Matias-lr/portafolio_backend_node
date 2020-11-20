const db = require('../config/db')
const {getPropertys,createToken} = require('../helpers')
const table = 'edificio';

const atributes = ['nombre','direccion_edificio','telefono','foto','fk_id_comuna']

exports.select = async() =>{
    return await db.select_procedure(table)
}
exports.create = async(object) => {
    if(getPropertys(object,atributes)){
        const {nombre,direccion_edificio,telefono,foto,fk_id_comuna} = object
        const insert = {
            tabla:table,
            insert:[nombre,direccion_edificio,telefono,foto,fk_id_comuna]
        }
        console.log(insert)
        return await db.insert_procedure(insert)
        .then(res => 1)
        .catch(err => 0)
    }else{
        return 2
    }
}
exports.update = async(object) => {
    object.tabla = table
    return await db.update_procedure(object)
    .then(res => 1)
    .catch(err => 0)
}
exports.Delete = async(object) => {
    object.tabla = table
    return await db.disable_procedure(object)
    .then(res => 1)
    .catch(err => 0)
}
exports.edificioByNombre = async(nombre) => {
    return await db.global_procedure('edificio_nombre_select',nombre,0)
    .then(res => {return {status:1,object:res}})
    .catch(res => {return {status:0}})
}