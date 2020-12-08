const db = require('../config/db');
const {getPropertys} = require('../helpers')
const fs = require('fs-extra');
const moment = require('moment');

const table = 'guia_turistico';

const atributes = ['nombre','rut','telefono','foto'];

exports.select = async() =>{
    return await db.select_procedure(table)
}
exports.create = async() =>{
    if(getPropertys(object,atributes)){
        const {nombre,rut,telefono,foto} = object
        const time = moment().format("YYYYMMDDHHmmss")
        const path = `images/guia/${nombre}/principal.jpg`;
        const insert = {
            tabla:table,
            insert:[nombre,rut,telefono,path]
        }
        return await db.insert_procedure(insert)
        .then(res => {
            fs.outputFile(path, foto, 'base64', function(err) {
                console.log(err);
              });
            return 1
        })
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