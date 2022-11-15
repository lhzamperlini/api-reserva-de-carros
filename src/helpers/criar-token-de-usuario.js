const jwt = require('jsonwebtoken')

const criarTokenDeUsuario = async (user, req, res) => {
    
    //criar token
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, "nossoSegredo")

    //retornar token
    res.status(200).json({
        message: 'Login efetuado com sucesso.',
        token: token,
        userId: user.id
    })
}

module.exports = criarTokenDeUsuario