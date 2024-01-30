const Sequelize = require('sequelize');
const connection = require('./database');

const Answer = connection.define("answers", {
    corpo: {
        type : Sequelize.TEXT,
        allowNull : false
    },
    questionid: {
        type: Sequelize.INTEGER,
        allowNull : false
    }
})

Answer.sync({ force : false}).then(() => {
    console.log("banco de dados 2 criado!")
});

module.exports = Answer;