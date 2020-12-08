const db = require('../config/db')

module.exports = (route) =>{
    route.get('/combo/comuna',async (req,res) =>{
        await db.select_raw('select * from comuna')
        .then(json =>{
            var jsons = []
            json.rows.map((val,key) => {
                var aux = {
                    id:val[0],
                    nombre_comuna:val[1],
                    region:val[2]
                }
                jsons.push(aux)
            })
            res.status(200).json(jsons)
        })
        .catch(err =>{
            res.status('400')
        })
    })
    route.get('/combo/region',async (req,res) =>{
        await db.select_raw('select * from region')
        .then(json =>{
            var jsons = []
            json.rows.map(val => {
                var aux = {
                    id:val[0],
                    nombre_region:val[1],
                }
                jsons.push(aux)
            })
            res.status(200).json(jsons)
        })
        .catch(err =>{
            res.status('400')
        })
    })
    route.get('/combo/implementos',async (req,res) =>{
        await db.select_raw('select * from implementos_departamento')
        .then(json =>{
            var jsons = []
            json.rows.map(val => {
                var aux = {
                    id:val[0],
                    nombre_region:val[1],
                }
                jsons.push(aux)
            })
            res.status(200).json(jsons)
        })
        .catch(err =>{
            res.status('400')
        })
    })
    route.get('/combo/serviciosDepa',async (req,res) =>{
        await db.select_raw('select * from servicios_depa')
        .then(json =>{
            var jsons = []
            json.rows.map(val => {
                var aux = {
                    id:val[0],
                    nombre_region:val[1],
                }
                jsons.push(aux)
            })
            res.status(200).json(jsons)
        })
        .catch(err =>{
            res.status('400')
        })
    })
}