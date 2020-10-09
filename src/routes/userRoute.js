const {UserRegister,UserSelect,UserLogin,User} = require('../controllers/UserController')
const middleware = require('../middleware/athenticationMiddleware')


module.exports = (route) => {
    route.post('/user/register',UserRegister)
    route.get('/user/select',UserSelect)
    route.post('/user/login',UserLogin)
    //route.get('/user/logout',UserLogout)
    route.get('/user',middleware.Authenticated,User)
    }