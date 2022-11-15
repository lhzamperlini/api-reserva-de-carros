const { DataTypes } = require('sequelize')
const db = require('../db/conexão')

const Usuario = db.define('Usuario', {
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

module.exports = Usuario