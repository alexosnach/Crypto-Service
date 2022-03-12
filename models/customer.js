const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const definitions = require('../utils/definitions')


const customer = sequelize.define('Customers', {
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
    username: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    first_name: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    is_subscriber: {
        allowNull: false,
        type: Sequelize.TINYINT,
        defaultValue: 0
    }, 
    subscription_end_date: {
        allowNull: true,
        type: Sequelize.DATE
    },
    invited_by: {
        allowNull: true,
        type: Sequelize.BIGINT
    },
    money: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: definitions.CUSTOMER.STATUS.ACTIVE
    }
});


module.exports = customer
