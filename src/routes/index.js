const {Router} = require('express')
const router = Router()

require('./userRoute')(router)

module.exports = router