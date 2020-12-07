const express = require('express')
const server = express()
const user =require('./models/User')
const db = require('./config/db')
const cors = require('cors')
require('dotenv').config()

const config = require('./config/cors')
const port = process.env.PORT

server.use(cors(config.application.cors.server))
server.use('/images',express.static('images'))

server.use(express.json({limit:"50mb"}))
server.use(express.urlencoded({extended:false}))

server.get('/', function(req, res) {
    res.send('hello world');
  });
  server.use('/api',require('./routes'))

server.listen(port);
console.log('application listen on port '+ port)
