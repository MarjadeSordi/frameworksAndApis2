const express = require('express')
const mongoose = require('mongoose') 
const loginMidlleware = require('./middleware/login_middleware')
const categoria = require('./rotas/categoria_rotas')
const treino = require('./rotas/treino_rotas')
const login = require('./rotas/usuario_rotas')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const trataLog = (req, res, next) => {
  console.log("Metodo", req.method);  
  console.log("URI", req.originalUrl);
  next();
  console.log("Status",res.statusCode);
}

//Configuração da conexão com o Mongo
mongoose.connect('mongodb://127.0.0.1:27017/treino_db')
  .then(() => {
    console.log("Conectado ao Mongo..");
  }).catch((error) => { 
    console.log("Erro>:", error) 
  });

app.use(trataLog);
app.use('/login', login)
app.use(loginMidlleware.verifyJWT);
app.use('/categoria', categoria)
app.use('/treino', treino)
           




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})