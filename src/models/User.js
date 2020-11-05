const db = require('../config/db')
const {getPropertys,createToken} = require('../helpers')

const table = 'usuario';

const atributes = ['nombre','pass','email','foto','rut','direccion','telefono','tipo_usu']

exports.select = async () => {
    return await db.select_procedure(table);
}
exports.create = async (object) =>{
    if(getPropertys(object,atributes)){
        const {nombre,pass,email,foto,rut,direccion,telefono,tipo_usu} = object
        const insert = {
            tabla:table,
            insert:[nombre,pass,email,foto,rut,direccion,telefono,tipo_usu]
        }
        var string = await db.global_procedure('proce_email2',email,0)
        .then(res => res)
        .catch(err => console.log(res))
        if(string == 0){
            return await db.insert_procedure(insert)
            .then(res => {return 1})
            .catch(err => {return 0})
        }else{
            return 3
        }
    }else{
        return 2;//faltan o sobran atributos
    }
}
exports.login = async (object) => {
    if(getPropertys(object,['email','pass','device_name','ip_adress'])){
        const {email,pass,device_name,ip_adress} = object
        var string = await db.global_procedure('proce_email2',email,0)
        .then(res => res)
        .catch(err => err)
        if (string != 0){
            if(pass == string.contrasenia){
                const {id_usu,nombre,constrasenia,foto,rut,direccion,telefono,tipoUsuario} = string
                const token = createToken({email,nombre,constrasenia,foto,rut,direccion,telefono,tipoUsuario})
                const insert = {
                    tabla:'token',
                    insert:[token,device_name,ip_adress,0,id_usu]
                }
                return await db.insert_procedure(insert)
                .then(response => {
                    return {token,status:1}
                })
                .catch(err => {
                    return {status:0}
                })
            }else{ 
                return {status:2};
            }
        }else{
            return {status:2};
        }
    }else{
        return {status:2}
    }
}
exports.logout = async(token) =>{
    var tokenn = await db.global_procedure('proce_token',token,0)
    .then(response => response)
    .catch(err => console.log(err))
    console.log('token:',tokenn)
    if(tokenn == 0){
        return 0
    }
    return await db.delete_procedure({tabla:'token',id:tokenn.id_token})
    .then(response=> 1)
    .catch(err => {
        console.log(err)
        return 0
    })
}
exports.getSesions = async(token,user) =>{
    var tokenn = await db.global_procedure('proce_token',token,0)
    .then(response => response)
    .catch(err => console.log(err))
    console.log('token:',tokenn)
    if(tokenn == 0){
        return {status:0}
    }
    var tokens = await db.global_procedure('token_id_usu_select',tokenn.idUsuario,0)
    .then(res => res)
    .catch(err => err)
    return {sesions:tokens,status:1}
}
