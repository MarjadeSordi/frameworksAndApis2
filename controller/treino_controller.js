const Treino = require("../model/treino");



exports.listar = (req, res) => {
console.log('aqui')
    Treino.find({}, (err, treino) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(treino);
    })
}

exports.inserir = (req, res) => {
    const treinoRequest = req.body;
    if(treinoRequest && treinoRequest.tipo && treinoRequest.data && treinoRequest.tempoDeTreino) {

        const novoTreino = new Treino(treinoRequest);
        novoTreino.save((err, treinoSalvo) => {
            if(err) {
                res.status(500).send(err);
            }
            else {
                return res.status(201).json(treinoSalvo);
            }
        })
        
    }
    else {
        return res.status(400).json({
            Erro:"Data e horário são necessários para cadastrar um novo treino"
        })
    }
}


exports.buscarTreinoPorId = (req, res) => {
    const id = req.params.id;
    Treino.findById(id).populate('categoria').exec((err, treinoEncontrado) => {
        if(err) {
            res.status(500).send(err); 
        }
        else if(treinoEncontrado) {
            return res.json(treinoEncontrado);
        }
        else {
            return res.status(404).json(
                { Erro: "Treino nao encontrado" }
            )
        }
    
    })
}


exports.atualizarTreino = (req, res) => {
    const id = req.params.id;
    const treinoRequest = req.body;

    if(!treinoRequest|| !treinoRequest.tipo || !treinoRequest.data || !treinoRequest.tempoDeTreino) {
        return res.status(400).json({
            Erro:"Treino, data e tempo de treino são obrigatórios"
        });    
    }

    Treino.findByIdAndUpdate(id, treinoRequest, {new: true}, 
        (err, treinoAtualizado) => {
            if(err) {
                res.status(500).send(err)
            }
            else if(treinoAtualizado) {
                return res.json(treinoAtualizado);
            }
            else {
                return res.status(404).json(
                    { Erro: "Treino não encontrado" }
                )
            }
        })
    }

exports.deletar = (req, res) => {
    const id = req.params.id;

    Treino.findByIdAndDelete(id, (err, treinoDeletado) => {
        if(err) {
            return res.status(500).send(err);
        }
        else if(treinoDeletado) {
            return res.json(`Treino de ${treinoDeletado.tipo} deletado com sucesso`);
        }
        else {
            return res.status(404).json(
                { Erro: "Treino não encontrado" }
            )    
        }
    })    
}
