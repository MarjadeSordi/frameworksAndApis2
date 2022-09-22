const express = require('express');
const usuarioController = require('../controller/usuario_controller')
const router = express.Router();
const jwt = require('jsonwebtoken');
//Rota do recurso: "/api/produtos"

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      next();
    });
}


router.get('/', verifyJWT, usuarioController.listaUsuarios)
router.post('/cadastro', usuarioController.inserir)
router.post('/', usuarioController.validarUsuario)
/*router.get('/usuario/:name', usuarioController.buscarPorId)
router.put('/usuario/:id', usuarioController.atualizar)
router.delete('/:id', usuarioController.deletar)*/

module.exports = router;