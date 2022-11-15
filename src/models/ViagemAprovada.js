const { DataTypes } = require('sequelize')
const db = require('../db/conexão')

const ViagemAprovada = db.define('ViagemAprovada', {
    passageiro: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    dataViagem: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        require: true
    },
    localSaida: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    destino: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    horarioSaída: {
        type: DataTypes.TIME,
        allowNull: false,
        require: true
    },
    horarioRetorno: {
        type: DataTypes.TIME,
        allowNull: false,
        require: true
    },
    motorista: {
        type: DataTypes.STRING,
        require: true
    },
    carro: {
        type: DataTypes.STRING,
        require: true
    }
})

module.exports = ViagemAprovada