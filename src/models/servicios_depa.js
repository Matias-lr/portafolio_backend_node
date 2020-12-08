const db = require('../config/db');
const {getPropertys} = require('../helpers')

const table = 'servicios_depa';

const atributes = ['nombre','descripcion'];

exports.select = async() =>{
    return await db.select_procedure(table)
}
exports.create = async() =>{
    if(getPropertys(object,atributes)){
        const {nombre,descripcion} = object
        const insert = {
            tabla:table,
            insert:[nombre,descripcion]
        }
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