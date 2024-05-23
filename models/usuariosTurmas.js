const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize');
const UsuariosTurmas = sequelize.define('usuarios_turmas', {
    //define as informações da tabela colunas
    Turmas_idTurmas: {
        type: Sequelize.INTEGER,
        primaryKey: false
    },
    Usuarios_idUsuarios: {
        type: Sequelize.INTEGER,
        primaryKey: false
    },
},
{
    //precisa disso pq não tem as colunas createdAt e updateAt no bd
    timestamps: false //Adiciona colunas createdAt e updateAt automaticamente
});
UsuariosTurmas.removeAttribute("id")
module.exports = UsuariosTurmas;