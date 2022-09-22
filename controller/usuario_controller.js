const Usuario = require('../model/usuario');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken')

exports.listaUsuarios = (req, res) => {
    Usuario.find({}, (err, listaUsuarios) => {
        if (err) {
            res.status(500).json({ msg: err.msg })
        }
        else {
            res.json(listaUsuarios);
        }
    })
}


exports.buscarPorUsername = (req, res) => {
    const query = req.query;
    if (query && query.username) {
        Usuario.findOne(query.username, (err, UsuarioEncontrado) => {
            if (err) {
                res.status(500).json({ msg: err })
            }
            else if (UsuarioEncontrado) {
                res.json(UsuarioEncontrado);
            }
            else {
                res.status(404).json({ msg: "Usuario nao encontrado" });
            }
        });
    }
    else {
        //Bad Request

        res.status(400).json({ msg: "Faltou a query username" });
    }
}


exports.inserir = (req, res) => {
    let user = req.body;
    if (user.usuario && user.senha) {
        const userNovo = new Usuario(user);
        userNovo.save(user, (err, UsuarioInserido) => {
            if (err) {
                res.status(500).json({ msg: err.msg })
            }
            else {
                res.status(201).send(UsuarioInserido);
            }
        });
    }
    else {
        //Bad request 
        res.status(400).json({ msg: "Entrada de dados inválida" });
    }
};



exports.validarUsuario = (req, res) => {
    const userLogin = req.body;
    const userLoginUsuario = req.body.usuario;
    if (userLogin && userLogin.usuario && userLogin.senha) {
        Usuario.findOne({userLoginUsuario} , (err, usuarioLogado) => {
            if (err) {
                res.status(401).json({ msg: "Usuário Inválido" })
            }
            else if (usuarioLogado) {
                if (usuarioLogado.senha == usuarioLogado.senha) {
                    //auth ok
                    const id = usuarioLogado._id; 
                    const token = jwt.sign( {id}, process.env.SECRET, {
                        expiresIn: 300 // expires in 5min
                      });
                      return  res.status(201).json({ auth: true, token: token });
                }
                else {
                    res.status(401).json({ msg: "Senha inválida" })
                }
            }
            else {
                res.status(404).json({ msg: "Usuario inválido" });
            }
        })
    }
    else {
        res.status(401).json({ msg: "Usuário ou senha inválidos" })
    }
}


