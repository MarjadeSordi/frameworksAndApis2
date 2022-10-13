const express = require('express');
const treinoController = require('../controller/treino_controller')
const router = express.Router();


router.get('/', treinoController.listar)
router.post('/', treinoController.inserir)
router.get('/:id', treinoController.buscarTreinoPorId)
router.put('/:id', treinoController.atualizarTreino)
router.delete('/:id', treinoController.deletar)

module.exports = router;