const db = require('../config/db');
const {getPropertys} = require('../helpers')

const table = 'servicios_extra';

const atributes = ['nombre','descripcion','valor','fk_id_encargado','fk_id_edificio'];