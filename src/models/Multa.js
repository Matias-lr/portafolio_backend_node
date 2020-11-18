const db = require('../config/db');
const {getPropertys} = require('../helpers')

const table = 'multa';

const atributes = ['fecha_creacion','periodo_de_gracia','fecha_expiracion_del_pago','fk_id_multas','fk_id_arriendo'];