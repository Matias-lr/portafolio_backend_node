const {Router} = require('express')
const router = Router()

require('./userRoute')(router)
require('./edificioRoute')(router)
require('./departamentoRoute')(router)
require('./comboboxRoute')(router)
require('./serviciosDepaRoute')(router)
require('./ImplementosRoute')(router)

module.exports = router