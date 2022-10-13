const Categoria = require("../model/categoria");



exports.listar = (req, res) => {

    Categoria.find({}, (err, categoria) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(categoria);
    })
}

exports.inserir = (req, res) => {
    const categoriaRequest = req.body;
    if(categoriaRequest && categoriaRequest.nome ) {

        const categoriaNovo = new Categoria(categoriaRequest);
        categoriaNovo.save((err, categoriaSalvo) => {
            if(err) {
                res.status(500).send(err);
            }
            else {
                return res.status(201).json( categoriaSalvo);
            }
        })
        
    }
    else {
        return res.status(400).json({
            Erro:"Nome é obrigatorio"
        })
    }
}

exports.buscarPorId = (req, res) => {
    const id = req.params.id;

    //Produto.findOne({_id: id}, (err, produtoEncontrado) => {   
    Categoria.findById(id, (err, categoriaEncontrado) => {
        if(err) {
            res.status(500).send(err); 
        }
        else if(categoriaEncontrado) {
            return res.json(categoriaEncontrado);
        }
        else {
            return res.status(404).json(
                { Erro: "Categoria não encontrada" }
            )
        }
    
    })
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const produtoRequest = req.body;

    if(!produtoRequest || !produtoRequest.nome || !produtoRequest.preco) {
        return res.status(400).json({
            Erro:"Nome e/ou preco sao obrigatorios"
        });    
    }

    Produto.findByIdAndUpdate(id, produtoRequest, {new: true}, 
        (err, produtoAtualizado) => {
            if(err) {
                res.status(500).send(err)
            }
            else if(produtoAtualizado) {
                return res.json(produtoAtualizado);
            }
            else {
                return res.status(404).json(
                    { Erro: "Produto nao encontrado" }
                )
            }
        })
    }

exports.deletar = (req, res) => {
    const id = req.params.id;

    Produto.findByIdAndDelete(id, (err, produtoDeletado) => {
        if(err) {
            return res.status(500).send(err);
        }
        else if(produtoDeletado) {
            return res.json(produtoDeletado);
        }
        else {
            return res.status(404).json(
                { Erro: "Produto nao encontrado" }
            )    
        }
    })    
}
