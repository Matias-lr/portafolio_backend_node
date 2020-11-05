const {EdificioCreate,EdificioSelect} = require('../controllers/EdificioController')
const middleware = require('../middleware/athenticationMiddleware')


module.exports = (route) => {
    route.get('/edificios',EdificioSelect)
    route.post('/edificio/create',[middleware.Authenticated,middleware.isAdmin],EdificioCreate)
}