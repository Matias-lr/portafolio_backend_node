const db = require('../config/db');
const {getPropertys} = require('../helpers')

const table = 'servicio_de_transporte';

const atributes = ['fk_id_vehiculo','fk_id_chofer','fk_id_arriendo','fk_id_transporte'];