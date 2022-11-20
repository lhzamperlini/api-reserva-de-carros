const jwt = require ('jsonwebtoken')
const Usuario = require('../../models/Usuario')


const pegarUsuarioPorToken = async (token) => {
    if(!token){
        return res.status(401).json({
            message: 'Acesso Negado!'
        })
    }
    const decodificado = jwt.verify(token, 'nossoSegredo')
    const usuarioId = decodificado.id
    const usuario =  await Usuario.findOne({where:{id: usuarioId}})
    return usuario
}

module.exports = pegarUsuarioPorToken