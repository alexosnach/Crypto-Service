const { regexp } = require('assert-plus')
const { reject } = require('bluebird')
const { resolve } = require('path/posix')
const { message } = require('statuses')
const MessageModel = require('../models/message')
const { Op } = require('sequelize');

class Message {
    constructor(message, type) {
        this.message = message
        this.type = type
    }

    static save(message, type) {
        return new Promise(async (resolve, reject) => {
            await MessageModel.create({
                message: message,
                message_type: type
            })

            resolve()
        })
    }

    static delete(id) {
        return new Promise(async (resolve, reject) => {
            const message = await MessageModel.findByPk(id)
            await message.destroy()

            if (message) {
                resolve(message)
            } else {
                reject(new Error('Can\'t find any messages to delete'))
            }
        })
    }

    static getAll() {
        const objArr = []

        return new Promise(async (resolve, reject) => {
            const messages = await MessageModel.findAll()

            for (var i = 0; i < messages.length; i++) {
                const obj = {
                    id: messages[i].id,
                    message: messages[i].message,
                    type: messages[i].message_type
                }

                objArr.push(obj)
            }

            resolve(objArr)
        })
    }

    static update(id, msg) {
        return new Promise(async (resolve, reject) => {
            const message = await MessageModel.findByPk(id)
            message.message = msg
            await message.save()

            if (message) {
                resolve(message)
            } else {
                reject(new Error('Can\'t find any message to update'))
            }
        })
    }

    static getById(id) {
        return new Promise(async (resolve, reject) => {
            const message = await MessageModel.findByPk(id)

            if (message) {
                resolve(message)
            } else {
                reject(new Error('Can\'t find any message to update'))
            }
        })
    }

    static getMessagesByType(type) {
        return new Promise(async (resolve, reject) => {
            const messages = await MessageModel.findAll({
                where: {
                    message_type: type
                },
                order: [
                    ['id', 'ASC']
                ]
            })

            if (messages) {
                resolve(messages)
            } else {
                reject(new Error('Can\'t find any messages by type'))
            }
        })
    }
}

module.exports = Message