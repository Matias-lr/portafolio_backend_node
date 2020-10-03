const express = require('express')
const server = express()
const db = require('./config/db')
const cors = require('cors')
const oracledb = require("oracledb")
require('dotenv').config()

const config = require('./config/cors')
const port = process.env.PORT

server.use(cors(config.application.cors.server))

server.use(express.json())
server.use(express.urlencoded({extended:false}))

server.get('/', function(req, res) {
    res.send('hello world');
  });
  server.use('/api',require('./routes'))

server.listen(port);
console.log('application listen on port '+ port)
/*db.select_procedure('usuario').then(val => console.log(val))
var obj = {
  tabla:'usuario',
  insert:['matias','matias','email@email.com','asdhjsadhaksjd','201814871','alfredo acevedo 1044','ashdjkashdkasd',1]
}
db.insert_procedure(obj)*/
/*var obj = {
  tabla:'usuario',
  id:2,
  update:[{columna:'nombre',value:'felipito'},{columna:'contrasenia',value:'asdjklasdjklasdjkl'}]
}*/

/*var obj = {
  tabla:'usuario',
  id:23
}*/

