const db = require('../config/db');
const {getPropertys} = require('../helpers')

const table = 'pago';

const atributes = ['monto','fk_id_tipo','fk_id_arriendo','fk_id_estado']