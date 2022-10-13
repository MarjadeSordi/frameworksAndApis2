const express = require('express');
const categoriaController = require('../controller/categoria_controller')

const router = express.Router();
//Rota do recurso: "/api/produtos"

router.get('/', categoriaController.listar)
router.post('/', categoriaController.inserir)
router.get('/:id', categoriaController.buscarPorId)
/*router.put('/:id', produtoController.atualizar)
router.delete('/:id', produtoController.deletar)*/

module.exports = router;