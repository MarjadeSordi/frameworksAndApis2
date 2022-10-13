const mongoose = require ('mongoose')
const Schema = mongoose.Schema;


const CategoriaSchema = new Schema({
    nome: String,
},
{
    versionKey: false
});

module.exports = mongoose.model("Categoria", CategoriaSchema);