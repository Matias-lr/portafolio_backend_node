const middleware = require('../middleware/athenticationMiddleware')
const {DepartamentoSelect,DepartamentoCreate,DepartamentoUpdate,DepartamentoByEdificio} = require('../controllers/DepartamentoController')

module.exports = (route) => {
    route.get('/departamentos',DepartamentoSelect)
    route.post('/departamento/create',[middleware.Authenticated,middleware.isAdmin],DepartamentoCreate)
    route.put('/departamento/:id/update',[middleware.Authenticated,middleware.isAdmin],DepartamentoUpdate)
    route.get('/departamentoByEdificio/:id',DepartamentoByEdificio)
}