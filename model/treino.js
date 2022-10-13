const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const TreinosSchema = new Schema({
    tipo: String,
    data: Date,
    tempoDeTreino: Number,
    categoria: {type: Schema.Types.ObjectId, ref: 'Categoria'}
},
{
    versionKey: false
});

module.exports = mongoose.model("Treino", TreinosSchema);