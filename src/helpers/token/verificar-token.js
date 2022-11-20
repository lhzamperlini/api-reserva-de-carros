const jwt = require('jsonwebtoken')
const pegarToken = require('./pegar-token')

//Middleware que valida o token
const verificarToken = (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(401).json({
            message: 'Acesso Negado!'
        })
    }
    const token = pegarToken(req)
    if(!token){
        return res.status(401).json({
            message: 'Acesso Negado!'
        })
    }
    
    try {
        const verificado = jwt.verify(token,'nossoSegredo')
        req.user = verificado
        next() 
    } 
    catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Token Invalido'
        })
    }

}

module.exports = verificarToken

 