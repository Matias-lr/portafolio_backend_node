const db = require('../config/db');
const {getPropertys} = require('../helpers');

const table = 'check_in';

const atributes = ['fecha_hora','validado','fk_id_arriendo']

exports.create = async(objeto) =>{
    if(getPropertys(object,atributes)){
        let {fecha_hora,validado,fk_id_arriendou} = object;
        return await db.select_raw(`insert into ${table}(fecha_hora,validado,fk_id_arriendo,activo,)
         values('${fecha_hora}',${validado},${fk_id_arriendo},1)`)
         .then(res =>  1)
         .catch(err => 0)
    }else{
        return 2
    }
}