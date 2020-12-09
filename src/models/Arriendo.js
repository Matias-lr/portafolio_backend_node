const db = require('../config/db');
const {getPropertys} = require('../helpers');

const table = 'arriendo';

const atributes = ['fecha_arriendo','acompaniantes','precio','fk_id_departamento','fk_id_turismo','fk_id_servicio_extra','fk_id_usu']

exports.select = async() =>{
    return await db.select_procedure(table)
}
exports.create = async(object) =>{
    if(getPropertys(object,atributes)){
        let {fecha_arriendo,acompaniantes,precio,fk_id_departamento,fk_id_turismo,fk_id_servicio_extra,fk_id_usu} = object
        return await db.select_raw(`insert into arriendo(fecha_arriendo,acompaniantes,precio,fk_id_departamento,fk_id_turismo,fk_id_servicio_extra,fk_id_usu,activo)
         values('${fecha_arriendo}',${acompaniantes},${precio},${fk_id_departamento},${fk_id_turismo},${fk_id_servicio_extra},${fk_id_usu},1)`)
        .then(res =>  1)
        .catch(err => 0)
    }else{
        return 2
    }
}