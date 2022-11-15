const { Sequelize } = require('sequelize')
const dbconfig = require('../config/database')

const sequelize = new Sequelize(dbconfig) 

sequelize.authenticate()
    .then(()=> console.log('Banco de dados conectado'))
    .catch((error)=> console.log(error))

module.exports = sequelize