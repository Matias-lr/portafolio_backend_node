module.exports = (route) => {
    route.get('/user',(req,res)=>{
        res.status(200).json({
            1:'usuario'
        })
    })
    }