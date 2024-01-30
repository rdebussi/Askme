//importando a biblioteca Sequelize que permite trabalhar com banco de dados para a const Sequelize
const Sequelize = require('sequelize');

//criando a conexão com o bd usando nomr do bd, root e senha como parametro, e definindo o host e a construção do bd"mysql"
const connection = new Sequelize('askme', 'root', 'guitarra21', {
    host: 'localhost', 
    dialect: 'mysql'
})

//exportando a const connection
module.exports = connection