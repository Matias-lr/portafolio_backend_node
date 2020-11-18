const db = require('../config/db');
const {getPropertys} = require('../helpers')

const table = 'tour';

const atributes = ['nombre','descripcion','lugar_visita','valor','fecha_salida','fecha_llegada','telfk_id_tipo_edificio','fk_id_tipo_guia']