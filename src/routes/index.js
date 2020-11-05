const {Router} = require('express')
const router = Router()

require('./userRoute')(router)
require('./edificioRoute')(router)
require('./departamentoRoute')(router)

module.exports = router