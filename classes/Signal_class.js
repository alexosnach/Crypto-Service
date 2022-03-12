const { regexp } = require('assert-plus')
const { reject } = require('bluebird')
const { resolve } = require('path/posix')
const { message } = require('statuses')
const SignalModel = require('../models/signal')
const HistoryModel = require('../models/history')
const { Op } = require('sequelize');
const definitions = require('../utils/definitions')


class Signal {
    static save(fields) {
        return new Promise(async (resolve, reject) => {
            const signal = await SignalModel.create({
                curr1: fields.currency1,
                curr2: fields.currency2,
                deal_type: fields.dealType,
                exchange: fields.exchange,
                entry1: fields.entry1,
                entry2: fields.entry2,
                target1: fields.target1,
                target2: fields.target2,
                target3: fields.target3,
                target4: fields.target4,
                target5: fields.target5,
                target6: fields.target6,
                target7: fields.target7,
                stop_lose: fields.stopLose,
                message: fields.text,
                audience: fields.audience,
            })
            
            resolve(signal)
        })
    }

    static getSignalsByStatus(status) {
        return new Promise(async (resolve, reject) => {
            const signals = await SignalModel.findAll({
                where: {
                    status: status
                }
            })

            if (signals) {
                resolve(signals)
            } else {
                reject(new Error('Find signals went wrong'))
            }
        })
    }

    static addToHystory(signalId, telegramId) {
        return new Promise(async (resolve, reject) => {
            const historyRow = await HistoryModel.create({
                signal_id: signalId,
                telegram_id: telegramId
            })

            resolve(historyRow)
        })
    }

    static closeSignal(id) {
        return new Promise(async (resolve, reject) => {
            const signals = await SignalModel.findAll({
                where: {
                    id: id
                }
            })

            signals[0].status = definitions.SIGNAL.STATUS.CLOSED
            signals[0].save()

            if (signals) {
                resolve(signals[0])
            } else {
                reject(new Error('Find signals went wrong while closing signal'))
            }
        })
    }

    static getSignalBy(id) {
        return new Promise(async (resolve, reject) => {
            const signals = await SignalModel.findAll({
                where: {
                    id: id
                }
            })

            if (signals) {
                resolve(signals[0])
            } else {
                reject(new Error('Find signals went wrong'))
            }
        })
    }

    static getCustomersWhoGetSignalBy(id) {
        return new Promise(async (resolve, reject) => {
            const signals = await HistoryModel.findAll({
                where: {
                    signal_id: id
                }
            })

            if (signals) {
                resolve(signals)
            } else {
                reject(new Error('Find history signals went wrong'))
            }
        })
    }
}

module.exports = Signal