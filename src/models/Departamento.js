const db = require('../config/db')
const {getPropertys,createToken} = require('../helpers')
const fs = require('fs');
const moment = require('moment');
const table = 'departamento';

const atributes = ['numero_habitacion','numero_habitaciones','metros_cuadrados','banios','piso','precio_noche','foto','fk_id_edificio','fk_id_estado']

exports.select = async() =>{
    return await db.select_procedure(table)
}
exports.create = async(object) => {
    if(getPropertys(object,atributes)){
        const {numero_habitacion,numero_habitaciones,metros_cuadrados,banios,piso,precio_noche,foto,fk_id_edificio,fk_id_estado} = object
        const insert = {
            tabla:table,
            insert:[numero_habitacion,numero_habitaciones,metros_cuadrados,banios,piso,precio_noche,foto,fk_id_edificio,fk_id_estado]
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
exports.selectByEd = async(id) => {
    return await db.global_procedure('depa_id_edificio_select',id,0)
    .then(res => {return {status:1,object:res}})
    .catch(err => {return {status:0}})
}
exports.Delete = async(object) => {
    object.tabla = table
    return await db.disable_procedure(object)
    .then(res => 1)
    .catch(err => 0)
}
exports.depaByNumName = async(nomEdi,NumDepa) => {
    var insert = [NumDepa,nomEdi];
    return await db.global_procedure('depa_numero_edificio_select',insert,0)
    .then(res => {return {status:1,object:res}})
    .catch(res => {return {status:0}})
}
exports.depaById = async(id) => {
    return await db.global_procedure('departamento_estado_select',id,0)
    .then(res => {return {status:1,object:res}})
    .catch(res => {return {status:0}})
}