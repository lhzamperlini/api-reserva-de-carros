const { DataTypes } = require('sequelize')
const db = require('../db/conexão')

const ViagemReprovada = db.define('ViagemReprovada', {
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
    motivoReprovação: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

module.exports = ViagemReprovada