const Usuario = require('../models/Usuario')

module.exports = class UsuarioController {
    static async registrar(req, res){
        const { login, senha, confirmaçãoDeSenha } = req.body

        //Validação de dados
            if(!login){
                res.status(422).json( { message: 'O campo login é obrigatorio' } )
                return
            }
            else if(!senha){
                res.status(422).json( { message: 'O campo senha é obrigatorio' } )
                return
            }
            else if(!confirmaçãoDeSenha){
                res.status(422).json( { message: 'O campo confirmação de senha é obrigatorio'} )
                return
            }

            if(senha != confirmaçãoDeSenha){
                res.status(422).json( { message: 'As senhas não coincidem' } )
                return
            }
        
        //Checar se usuario existe
            usuarioExistente = await Usuario.findOne( { login:login } )
            if(usuarioExistente){
                res.status(422).json({
                     message: 'O usuario já existe, por favor use outro login.' 
                })
                return
            }
        }
}