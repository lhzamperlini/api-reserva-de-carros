const express = require('express')
const cors = require('cors')
const db = require('./db/conexão') 
const app = express()

//Setando Json como formato de resposta
app.use(express.json())

//Configuração de Cors
app.use(cors({credentials: true, origin: 'http://localhost:4200'}))

//Importando Models - Apenas quando eles são importados as suas respectivas tabelas são criadas
const viagemAprovada = require('./models/ViagemAprovada')
const viagemPendente = require('./models/ViagemPendente')
const viagemReprovada = require('./models/ViagemReprovada')
const usuario = require('./models/Usuario')

//Rotas
const rotasUsuario = require('./routes/UsuarioRoutes')
app.use('/usuario', rotasUsuario)

//Configuração da porta onde vai rodar o BackEnd
db.sync()
.then(()=>{
    app.listen(3000, ()=> console.log('Backend Rodando na porta 3000.'))
})
.catch((error)=> console.log(error))