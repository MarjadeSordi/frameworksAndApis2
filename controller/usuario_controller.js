const Usuario = require('../model/usuario');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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


exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    Usuario.findById(id).exec((err, usuarioEncontrado) => {
        if(err) {
            res.status(500).send(err); 
        }
        else if(usuarioEncontrado) {
            return res.json(usuarioEncontrado);
        }
        else {
            return res.status(400).json(
                { Erro: "Usuario não encontrado" }
            )
        }
    
    })
}


exports.inserir = (req, res) => {
    let user = req.body;
    if (user.usuario && user.senha) 
    {
        const userNovo = new Usuario(user);
        userNovo.senha = bcrypt.hashSync(userNovo.senha, 10 );
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
    const userLoginSenha = req.body.senha;
    if (userLogin && userLogin.usuario && userLogin.senha) {
        Usuario.findOne({usuario: userLoginUsuario} , (err, usuarioLogado) => {
            if (err) {
                res.status(401).json({ msg: "Usuário Inválido" })
            } 
              else if (usuarioLogado && bcrypt.compareSync(userLoginSenha, usuarioLogado.senha)) {
                    //auth ok
                    console.error(usuarioLogado);
                    const id = usuarioLogado._id; 
                    const token = jwt.sign( {id}, process.env.SECRET, {
                        expiresIn: 300 // expires in 5min
                      });
                      return  res.status(201).json({ auth: true, token: token });
                }
                else {
                    console.error(usuarioLogado);
                    res.status(401).json({ msg: "Senha inválida" })
                }
            
           
        })
    
    }
    else {
        res.status(401).json({ msg: "Usuário ou senha inválidos" })
    }
}


exports.atualizarUsuario = (req, res) => {
    const id = req.params.id;
    const usuarioRequest = req.body;
    usuarioRequest.senha = bcrypt.hashSync(usuarioRequest.senha, 10 )

    if(!usuarioRequest || !usuarioRequest.usuario || !usuarioRequest.senha) {
        return res.status(400).json({
            Erro:"Usuario e Senha são obrigatorios"
        });    
    }

    Usuario.findByIdAndUpdate(id, usuarioRequest, {new: true}, 
        (err, usuarioAtualizado) => {
            if(err) {
                res.status(500).send(err)
            }
            else if(usuarioAtualizado) {
                return res.json(usuarioAtualizado);
            }
            else {
                return res.status(404).json(
                    { Erro: "Usuario nao encontrado" }
                )
            }
        })
    }

exports.deletar = (req, res) => {
    const id = req.params.id;

    Usuario.findByIdAndDelete(id, (err, usuarioDeletado) => {
        if(err) {
            return res.status(500).send(err);
        }
        else if(usuarioDeletado) {
            return res.json(`usuario ${usuarioDeletado.usuario} deletado com SUCESSO!`);
        }
        else {
            return res.status(404).json(
                { Erro: "Usuario não encontrado" }
            )    
        }
    })    
}

