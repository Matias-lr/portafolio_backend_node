const jwt = require('jsonwebtoken')

module.exports.getPropertys = (object,array) =>{
    var result = array.map(res => res in object? true:false).find(res => res == false)
    if(result === false){
        return false
    }else{
        return true
    }
}
module.exports.createToken = (user) => {
    var token = jwt.sign({...user},process.env.ENCRYPT_PASS_JWT)
    return token
}