const {Router} = require('express')
const router = Router()

require('./user')(router)
/*router.use('/',(req,res) => {
    res.status(200).json({
        1:'hola mundo'
    })
})*/

module.exports = router