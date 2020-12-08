const {ImplementoDepaCreate} = require('../controllers/implementosDepaController')
const middleware = require('../middleware/athenticationMiddleware')

module.exports = (route) => {
    //route.get('/edificios',EdificioSelect)
    route.post('/implementodepa/create',[middleware.Authenticated,middleware.isAdmin],ImplementoDepaCreate)
    /*route.put('/edificio/:id/update',[middleware.Authenticated,middleware.isAdmin],EdificioUpdate)
    route.delete('/edificio/:id/delete',[middleware.Authenticated,middleware.isAdmin],EdificioDelete)
    route.get('/edificioByName/:nombreEdi',[middleware.Authenticated,middleware.isAdmin],EdificioByNombre)
    */
}