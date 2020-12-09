const middleware = require('../middleware/athenticationMiddleware')
const {CheckOutCreate} = require('../controllers/CkeckOutController')

module.exports = (route) => {
    /*route.get('/departamentos',DepartamentoSelect)
    route.get('/departamentoByEdificio/:id',DepartamentoByEdificio)*/
    route.post('/checkout/create',CheckOutCreate)
    /*route.put('/departamento/:id/update',[middleware.Authenticated,middleware.isAdmin],DepartamentoUpdate)
    route.delete('/departamento/:id/delete',[middleware.Authenticated,middleware.isAdmin],DepartamentoDelete)
    route.get('/depanumeroedificio/:numDepa/:nomEdi',[middleware.Authenticated,middleware.isAdmin],DepaByNameId)
    route.get('/departamento/:id',DepaId)*/
}