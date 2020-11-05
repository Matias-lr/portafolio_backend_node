const db = require('../config/db')
const {getPropertys,createToken} = require('../helpers')
const table = 'edificio';

const atributes = ['nombre','direccion','telefono','foto','id_comuna']

exports.select = async() =>{
    return await db.select_procedure(table)
}
exports.create = async(object) => {
    if(getPropertys(object,atributes)){
        const {nombre,direccion,telefono,foto,id_comuna} = object
        const insert = {
            tabla:table,
            insert:[nombre,direccion,telefono,foto,id_comuna]
        }
        console.log(insert)
        return await db.insert_procedure(insert)
        .then(res => 1)
        .catch(err => 0)
    }else{
        return 2
    }
}