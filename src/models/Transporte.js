const db = require('../config/db');
const {getPropertys} = require('../helpers')

const table = 'transporte';

const atributes = ['nombre_transporte','descripcion_transporte','lugar_salida','lugar_llegada','salida','llegada','valor','fk_id_edificio'];