const express = require('express');
const usuarioController = require('../controller/usuario_controller')
const router = express.Router();


router.get('/', usuarioController.listaUsuarios)
router.post('/cadastro', usuarioController.inserir)
router.post('/', usuarioController.validarUsuario)
router.get('/:id', usuarioController.buscarPorId)
router.put('/cadastro/:id', usuarioController.atualizarUsuario)
router.delete('/cadastro/:id', usuarioController.deletar)

module.exports = router;