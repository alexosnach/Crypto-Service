const { regexp } = require('assert-plus')
const { reject } = require('bluebird')
const { resolve } = require('path/posix')
const { message } = require('statuses')
const SettingsModel = require('../models/settings')
const { Op } = require('sequelize');


class Settings {
    static getSettings() {
        return new Promise( async (resolve, reject) => {
            const settings = await SettingsModel.findAll()

            if (settings) {
                resolve(settings[0])
            } else {
                reject(new Error('Can\'t find any settings'))
            }
        });
    }

    static saveSettings(botToken, adminId, premiumLabel, freeLabel, subscriptionPrice, coeficient, maxSubscribers) {
        console.log(botToken)
        return new Promise( async (resolve, reject) => {
            const settings = await SettingsModel.findByPk(1)
            settings.bot_token = botToken
            settings.admin_id = adminId
            settings.premium_label = premiumLabel
            settings.free_label = freeLabel
            settings.subscription_price = parseFloat(subscriptionPrice),
            settings.subscription_price_coeficient = parseFloat(coeficient),
            settings.max_subscribers = parseInt(maxSubscribers)
            await settings.save()

            resolve(settings)
        });
    }

    static init(adminId) {
        return new Promise( async (resolve, reject) => {
            const records = await SettingsModel.findAll()

            if (records.length < 1) {
                const settings = SettingsModel.create({
                    admin_id: adminId
                })
    
                resolve(settings)
            } else {
                resolve()
            }
        });
    }

    static async getBotToken() {
        return new Promise(async (resolve, reject) => {
            await SettingsModel.sync()
            const settings = await SettingsModel.findAll()

            if (settings.length < 1) {
                await SettingsModel.create({
                    admin_id: 123456789
                })
            } else {
                resolve(settings[0].bot_token)
            }
        })
    }
}

module.exports = Settings