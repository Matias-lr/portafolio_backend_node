const middleware = require('../middleware/athenticationMiddleware')
const {DepartamentoSelect,DepartamentoCreate} = require('../controllers/DepartamentoController')

module.exports = (route) => {
    route.get('/departamentos',DepartamentoSelect)
    route.post('/departamento/create',[middleware.Authenticated,middleware.isAdmin],DepartamentoCreate)
}