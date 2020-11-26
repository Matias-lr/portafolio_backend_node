const db = require('../config/db')
const {getPropertys,createToken} = require('../helpers')
const fs = require('fs-extra');
const moment = require('moment');
const table = 'edificio';

const atributes = ['nombre','direccion_edificio','telefono','foto','fk_id_comuna']

exports.select = async() =>{
    var edificios = await db.select_procedure(table)
    const all = await Promise.all(edificios.map(async(val) =>{
        let areaEdi = await db.global_procedure('area_edi_id_select',val.id,0)
        let impleEdi = await db.global_procedure('imple_depa_id_select',val.id,0)
        const value = await {...val,implementos:impleEdi,areas:areaEdi}
        return value
    }))
    return all
}
exports.create = async(object) => {
    if(getPropertys(object,atributes)){
        const {nombre,direccion_edificio,telefono,foto,fk_id_comuna} = object
        const time = moment().format("YYYYMMDDHHmmss")
        const path = `images/edificio/${nombre}/principal.jpg`;
        const insert = {
            tabla:table,
            insert:[nombre,direccion_edificio,telefono,path,fk_id_comuna]
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
exports.edificioByNombre = async(nombre) => {
    return await db.global_procedure('edificio_nombre_select',nombre,0)
    .then(res => {return {status:1,object:res}})
    .catch(res => {return {status:0}})
}