
//models/Usuario.js
const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const Turmas = sequelize.define('Turmas', {
    // Define as informações da tabela colunas

    idturmas: {
        type: Sequelize.INTEGER,
        primaryKey: true, // Define essa coluna como a chave primária
        autoIncrement: true // Indica que é uma chave ´rimária autoincrementável
    },

codigo: Sequelize.STRING,
descricao: Sequelize.STRING,
inicio: Sequelize.DATE,
fim: Sequelize.DATE,
fotos: Sequelize.STRING,


},
{
    // Precisa disso pq não tem as colunas createAt e updatedAt no bd
      timestamps: false   // Adiciona colunas createdAt e updatedAt automaticamente
    });

module.exports = Turmas;