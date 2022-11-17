const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const criarTokenDeUsuario = require('../helpers/criar-token-de-usuario')

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
            const usuarioExistente = await Usuario.findOne( {where: { login:login }} )
            if(usuarioExistente){
                res.status(422).json({
                     message: 'O usuario já existe, por favor use outro login.' 
                })
                return
            }
        //Criptografar Senha
        const salt = await bcrypt.genSalt(12)
        const senhaCriptografada = await bcrypt.hash(senha, salt)

        //Criar objeto de usuario
        const usuario = {
            login,
            senha: senhaCriptografada
        }
        try{
            const usuarioCriado = await Usuario.create(usuario)
            await criarTokenDeUsuario(usuarioCriado, req, res)
        }
        catch(error){
            res.status(500).json({message: error})
        }  
    }

    static async login(req, res){
        const login = req.body.login
        const senha = req.body.senha

        //Validação se os campos foram preenchidos corretamente
            if(!login){
                res.status(422).json( { message: 'O campo login é obrigatorio' } )
                return
            }
            else if(!senha){
                res.status(422).json( { message: 'O campo senha é obrigatorio' } )
                return
            }        

        //Checar se usuario existe
            const usuario = await Usuario.findOne( {where: { login:login }} )
                if(!usuario){
                res.status(422).json({
                    message: 'Usuario inexistente, por favor verifique os dados e tente novamente.' 
                })
                return
            }
        
        //Verificar se a senha está correta
            const checarSenha = await bcrypt.compare(senha, usuario.senha)
            if(!checarSenha){
                res.status(422).json({
                    message: 'Senha incorreta, tente novamente.'
                })
                return
            } 

        //Criando Token de Usuario
            try{
                await criarTokenDeUsuario(usuario, req, res)
            }
            catch(error){
                res.status(500).json({message: error})
            }  
    }

}
