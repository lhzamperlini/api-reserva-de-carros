const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const criarTokenDeUsuario = require('../helpers/token/criar-token-de-usuario')
const pegarToken = require('../helpers/token/pegar-token')
const pegarUsuarioPorToken = require('../helpers/token/pegar-usuario-pelo-token')

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


    static async checarUsuarioLogado(req, res){
        let usuarioAtual
        if(req.headers.authorization){
            const token = pegarToken(req)
            const decodificado = jwt.verify(token, "nossoSegredo")

            usuarioAtual = await Usuario.findOne({where: {id: decodificado.id}})
        }
        else{
            usuarioAtual = null
        }
        res.status(200).send(usuarioAtual)
    }

    static async pegarUsuarioPorId(req, res){
        const id = req.params.id
        const usuario = await Usuario.findOne({where:{id: id}})

        if(!usuario){
            res.status(422).json({
                message: 'Usuario não encontrado.'
            })
            return
        }
        usuario.senha = null
        res.status(200).json({ usuario })
    }

    static async editarUsuario(req, res){
        const { login, senha, confirmacaoDeSenha} = req.body
        const token = pegarToken(req)
        const usuarioToken = await pegarUsuarioPorToken(token)
        const id = usuarioToken.id
        const usuario = {
            login: "",
            senha: ""
        }
        
         if(!usuarioToken){
             res.status(422).json({
                 message: 'Usuario não encontrado.'
             })
             return
         }

         const usuarioExistente = await Usuario.findOne( {where: { login:login }} )
         if(usuarioExistente){
         res.status(422).json({
             message: 'Login de Usuario já existe, por favor  mude o login.' 
         })
         return
     }
        //Validação de dados
             if(login){
                usuario.login = login
             }
             if(senha != confirmacaoDeSenha){
                 res.status(422).json( { message: 'As senhas não coincidem' } )
                 return
             }
             if(senha!=null){
                 const salt = await bcrypt.genSalt(12)
                 const senhaCriptografada = await bcrypt.hash(senha, salt)
                 usuario.senha = senhaCriptografada
             }
        
        //Criando objeto de usuario
        console.log(usuario)
          try {
              Usuario.update(usuario, {where: {id:id}})
              .then(()=>{
                  res.status(200).json({
                      message: 'Usuario Atualizado!'
                  })
                  return
              })
          } catch (error) {
              res.status(500).json({
                  message: 'Deu Merda.',
                  error: error
              })
          }
    }

}
