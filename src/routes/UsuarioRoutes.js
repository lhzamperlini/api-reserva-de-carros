const router = require('express').Router()
const usuarioController = require('../controllers/UsuarioController')

router.post('/registrar', usuarioController.registrar)
router.post('/login', usuarioController.login)
router.get('/checarusuario', usuarioController.checarUsuarioLogado)

module.exports = router
