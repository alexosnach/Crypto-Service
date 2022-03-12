const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const definitions = require('../utils/definitions')

const signal = sequelize.define('Signals', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    }, 
    curr1: {
        allowNull: false,
        type: Sequelize.STRING
    },
    curr2: {
        allowNull: false,
        type: Sequelize.STRING
    },
    deal_type: {
        allowNull: false,
        type: Sequelize.STRING
    },
    exchange: {
        allowNull: true,
        type: Sequelize.STRING
    },
    entry1: {
        allowNull: false,
        type: Sequelize.DOUBLE
    },
    entry1_achieved: {
        allowNull: true,
        type: Sequelize.TINYINT
    },
    entry2: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    target1: {
        allowNull: false,
        type: Sequelize.DOUBLE
    },
    target1_achieved: {
        allowNull: true,
        type: Sequelize.TINYINT
    },
    target2: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    target2_achieved: {
        allowNull: true,
        type: Sequelize.TINYINT
    },
    target3: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    target3_achieved: {
        allowNull: true,
        type: Sequelize.TINYINT
    },
    target4: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    target4_achieved: {
        allowNull: true,
        type: Sequelize.TINYINT
    },
    target5: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    target5_achieved: {
        allowNull: true,
        type: Sequelize.TINYINT
    },
    target6: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    target6_achieved: {
        allowNull: true,
        type: Sequelize.TINYINT
    },
    target7: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    target7_achieved: {
        allowNull: true,
        type: Sequelize.TINYINT
    },
    stop_lose: {
        allowNull: false,
        type: Sequelize.DOUBLE
    },
    message: {
        allowNull: true,
        type: Sequelize.TEXT
    },
    audience: {
        allowNull: false,
        type: Sequelize.STRING
    },
    status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: definitions.SIGNAL.STATUS.WAIT
    },
    profit: {
        allowNull: false,
        type: Sequelize.DOUBLE,
        defaultValue: 0
    }
});

module.exports = signal