const db = require('../config/db')
const {getPropertys,createToken} = require('../helpers')
const table = 'departamento';

const atributes = ['numero_habitacion','numero_habitaciones','metros_cuadrados','banios','piso','precio_noche','foto','id_edificio','id_estado']

exports.select = async() =>{
    return await db.select_procedure(table)
}
exports.create = async(object) => {
    if(getPropertys(object,atributes)){
        const {numero_habitacion,numero_habitaciones,metros_cuadrados,banios,piso,precio_noche,foto,id_edificio,id_estado} = object
        const insert = {
            tabla:table,
            insert:[numero_habitacion,numero_habitaciones,metros_cuadrados,banios,piso,precio_noche,foto,id_edificio,id_estado]
        }
        console.log(insert)
        return await db.insert_procedure(insert)
        .then(res => 1)
        .catch(err => 0)
    }else{
        return 2
    }
}