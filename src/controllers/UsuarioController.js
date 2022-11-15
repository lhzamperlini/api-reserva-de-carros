const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const { username } = require('../config/database')

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
            const usuarioExistente = await Usuario.findOne( { login:login } )
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
            await Usuario.create(usuario)
            .then((usuario)=>{
                res.status(201).json({
                    message: 'Usuario Criado com sucesso.',
                    usuario
                })
            })
        }
        catch(error){
            res.status(500).json({message: error})
        }  
    }}
