const middleware = require('../middleware/athenticationMiddleware')
const {ArriendoCreate} = require('../controllers/ArriendoController')

module.exports = (route) => {
    /*route.get('/departamentos',DepartamentoSelect)
    route.get('/departamentoByEdificio/:id',DepartamentoByEdificio)*/
    route.post('/arriendo/create',ArriendoCreate)
    /*route.put('/departamento/:id/update',[middleware.Authenticated,middleware.isAdmin],DepartamentoUpdate)
    route.delete('/departamento/:id/delete',[middleware.Authenticated,middleware.isAdmin],DepartamentoDelete)
    route.get('/depanumeroedificio/:numDepa/:nomEdi',[middleware.Authenticated,middleware.isAdmin],DepaByNameId)
    route.get('/departamento/:id',DepaId)*/
}