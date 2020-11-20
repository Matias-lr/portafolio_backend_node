const {EdificioCreate,EdificioSelect,EdificioUpdate,EdificioDelete,EdificioByNombre} = require('../controllers/EdificioController')
const middleware = require('../middleware/athenticationMiddleware')


module.exports = (route) => {
    route.get('/edificios',EdificioSelect)
    route.post('/edificio/create',[middleware.Authenticated,middleware.isAdmin],EdificioCreate)
    route.put('/edificio/:id/update',[middleware.Authenticated,middleware.isAdmin],EdificioUpdate)
    route.delete('/edificio/:id/delete',[middleware.Authenticated,middleware.isAdmin],EdificioDelete)
    route.get('/edificioByName/:nombreEdi',[middleware.Authenticated,middleware.isAdmin],EdificioByNombre)
}