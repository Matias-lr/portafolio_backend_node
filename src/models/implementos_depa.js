const db = require('../config/db');
const {getPropertys} = require('../helpers')

const table = 'implementos_departamento';

const atributes = ['nombre_implemento','valor_implemento'];

exports.select = async() =>{
    return await db.select_procedure(table)
}
exports.create = async(object) =>{
    if(getPropertys(object,atributes)){
        const {nombre_implemento,valor_implemento} = object
        const insert = {
            tabla:table,
            insert:[nombre_implemento,valor_implemento]
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
exports.ImplementosByDepa = async(id) =>{
    return await db.global_procedure('imple_depa_id_select',id,0)
    .then(res => {return {status:1,object:res}})
    .catch(res => {return {status:0}})
}