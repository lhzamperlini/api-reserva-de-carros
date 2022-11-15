const express = require('express')
const cors = require('cors')
const db = require('./db/conexão') 
const app = express()

//Setando Json como formato de resposta
app.use(express.json())

//Configuração de Cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//Configuração da porta onde vai rodar o BackEnd
db.sync()
.then(()=>{
    app.listen(3000, ()=> console.log('Backend Rodando na porta 3000.'))
})
.catch((error)=> console.log(error))