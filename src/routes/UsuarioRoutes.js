const router = require('express').Router()
const usuarioController = require('../controllers/UsuarioController')

router.post('/registrar', usuarioController.registrar)

module.exports = router
