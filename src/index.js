const express = require('express')
const cors = require('cors')

const app = express()

//Setando Json como formato de resposta
app.use(express.json())

//Configuração de Cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//Configuração da porta onde vai rodar o BackEnd
app.listen(8000, ()=> console.log('BackEnd rodando na porta 8000.'))
