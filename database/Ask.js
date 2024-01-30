//importando o Sequeliza
const Sequelize = require('sequelize');
//importando a conexão com a database
const connection = require('./database')

//definindo a tabela e as labels que serão criadas, define tbm tipos usando o Sequelize
const Ask = connection.define('pergunta', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//sincroniza e cria a tabela no bd, force serve para não forçar a criação caso a tb já exista
// .then é executado após a criação da tabela
Ask.sync({force: false}).then(() => {
    console.log('tabela criada com sucesso!')
})

module.exports = Ask