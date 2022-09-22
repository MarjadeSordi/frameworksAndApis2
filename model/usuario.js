const mongoose = require ('mongoose')
const Schema = mongoose.Schema;
// const {Schema}  = mongoose;

const UsuarioSchema = new Schema({
    usuario: String,
    senha: String
},
{
    versionKey: false
});

module.exports = mongoose.model("Usuario", UsuarioSchema);