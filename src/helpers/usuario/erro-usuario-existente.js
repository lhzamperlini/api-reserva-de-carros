const Usuario = require('../../models/Usuario')

module.exports = async (res, login) => {
    const usuarioExistente = await Usuario.findOne( {where: { login:login }} )
        if(usuarioExistente){
            res.status(422).json({
                message: 'O usuario já existe, por favor use outro login.' 
            })
        }
}
