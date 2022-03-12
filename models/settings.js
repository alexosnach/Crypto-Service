const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const settings = sequelize.define('Settings', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    }, 
    bot_token: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '488723037:AAHw9IYV1zN8umLqj4nIZoSMoP3AxgpjbWw'
    },
    admin_id: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: 123456789
    },
    premium_nessage_label: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: '🟡 '
    },
    free_nessage_label: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: '🔵 '
    }, 
    subscription_price: {
        allowNull: true,
        type: Sequelize.DOUBLE,
        defaultValue: 49
    },
    subscription_price_coeficient: {
        allowNull: true,
        type: Sequelize.DOUBLE,
        defaultValue: 1.6
    },
    max_subscribers: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 5
    }
});

module.exports = settings