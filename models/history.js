const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const definitions = require('../utils/definitions')

const history = sequelize.define('History', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    }, 
    telegram_id: {
        allowNull: false,
        type: Sequelize.BIGINT
    },
    signal_id: {
        allowNull: false,
        type: Sequelize.INTEGER
    }
});

module.exports = history