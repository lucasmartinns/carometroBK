const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const TiposUsuarios = sequelize.define('TipoUsuarios', {
    // Define as informações da tabela colunas

    idTipoUsuarios: {
        type: Sequelize.INTEGER,
        primaryKey: true, // Define essa coluna como a chave primária
        autoIncrement: true // Indica que é uma chave ´rimária autoincrementável
    },

descricao:sequelize.STRING,

},
{
    // Precisa disso pq não tem as colunas createAt e updatedAt no bd
      timestamps: false   // Adiciona colunas createdAt e updatedAt automaticamente
    });

module.exports = TiposUsuarios;