const {ServicioDepaCreate} = require('../controllers/serviciosDepaController')
const middleware = require('../middleware/athenticationMiddleware')

module.exports = (route) => {
    //route.get('/edificios',EdificioSelect)
    route.post('/servicioDepa/create',[middleware.Authenticated,middleware.isAdmin],ServicioDepaCreate)
    /*route.put('/edificio/:id/update',[middleware.Authenticated,middleware.isAdmin],EdificioUpdate)
    route.delete('/edificio/:id/delete',[middleware.Authenticated,middleware.isAdmin],EdificioDelete)
    route.get('/edificioByName/:nombreEdi',[middleware.Authenticated,middleware.isAdmin],EdificioByNombre)
    */
}