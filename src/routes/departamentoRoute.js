const middleware = require('../middleware/athenticationMiddleware')
const {DepartamentoSelect,DepartamentoCreate,DepartamentoUpdate,DepartamentoByEdificio,DepartamentoDelete,DepaByNameId} = require('../controllers/DepartamentoController')

module.exports = (route) => {
    route.get('/departamentos',DepartamentoSelect)
    route.get('/departamentoByEdificio/:id',DepartamentoByEdificio)
    route.post('/departamento/create',[middleware.Authenticated,middleware.isAdmin],DepartamentoCreate)
    route.put('/departamento/:id/update',[middleware.Authenticated,middleware.isAdmin],DepartamentoUpdate)
    route.delete('/departamento/:id/delete',[middleware.Authenticated,middleware.isAdmin],DepartamentoDelete)
    route.get('/depanumeroedificio/:numDepa/:nomEdi',[middleware.Authenticated,middleware.isAdmin],DepaByNameId)
}