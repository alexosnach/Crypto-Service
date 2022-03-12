const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const message = sequelize.define('Messages', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    }, 
    message: {
        allowNull: true,
        type: Sequelize.TEXT
    },
    message_type: {
        allowNull: true,
        type: Sequelize.STRING
    }
});

module.exports = message