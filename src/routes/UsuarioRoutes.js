const router = require('express').Router()
const usuarioController = require('../controllers/UsuarioController')

//Middleware
const verificarToken = require('../helpers/token/verificar-token')

router.post('/registrar', usuarioController.registrar)
router.post('/login', usuarioController.login)
router.get('/checarusuario', usuarioController.checarUsuarioLogado)
router.get('/:id', usuarioController.pegarUsuarioPorId)
router.patch('/editar/:id',verificarToken, usuarioController.editarUsuario)

module.exports = router
