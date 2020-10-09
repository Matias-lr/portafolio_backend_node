const {Router} = require('express')
const router = Router()

require('./userRoute')(router)
/*router.use('/',(req,res) => {
    res.status(200).json({
        1:'hola mundo'
    })
})*/

module.exports = router