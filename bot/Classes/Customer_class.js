const CustomerModel = require('../../models/customer')
const definitions = require('../../utils/definitions')
const { Op } = require('sequelize')

class Customer {
    static save(telegramId, userName, firstName, invitedBy = null) {
        return new Promise(async (resolve, reject) => {
            try {
                const cust = await this.getCustomerById(telegramId)

                if (cust.length <= 0 || cust[0].telegram_id !== telegramId) {
                    const customer = await CustomerModel.create({
                        telegram_id: telegramId,
                        username: userName ? userName : null,
                        first_name: firstName ? firstName : null,
                        invited_by: invitedBy
                    })
                    resolve(customer)
                } else {
                    this.changeCustomerStatus(telegramId, definitions.CUSTOMER.STATUS.ACTIVE).catch(e => reject(e))
                    resolve(cust)
                }
            } catch (e) {
                reject(e)
            }
        })
    }

    static getCustomerById(id) {
        return new Promise(async (resolve, reject) => {
            const customer = await CustomerModel.findAll({
                where: {
                    telegram_id: id
                }
            })

            if (customer) {
                resolve(customer)
            } else {
                reject(new Error(`Can\'t find a customer with id: ${id}`))
            }
        })
    }

    static changeCustomerStatus(id, status) {
        return new Promise(async (resolve, reject) => {
            const customer = await CustomerModel.findAll({
                where: {
                    telegram_id: id
                }
            })

            customer[0].status = status
            await customer[0].save()

            if (customer) {
                resolve(customer)
            } else {
                reject(new Error(`Can\'t find a customer with id: ${id}`))
            }
        })
    }

    static getAllCustomers() {
        return new Promise(async (resolve, reject) => {
            const customers = await CustomerModel.findAll()

            if (customers) {
                resolve(customers)
            } else {
                reject(new Error(`Can\'t find any customers`))
            }
        })
    }

    static getAllSubscribers() {
        return new Promise(async (resolve, reject) => {
            const customers = await CustomerModel.findAll({
                where: {
                    is_subscriber: {
                        [Op.eq]: 1
                    }
                }
            })

            if (customers) {
                resolve(customers)
            } else {
                reject(new Error(`Can\'t find any customers`))
            }
        })
    }

    static getAllFreeCustomers() {
        return new Promise(async (resolve, reject) => {
            const customers = await CustomerModel.findAll({
                where: {
                    is_subscriber: {
                        [Op.ne]: 1
                    }
                }
            })

            if (customers) {
                resolve(customers)
            } else {
                reject(new Error(`Can\'t find any customers`))
            }
        })
    }

    static getCustomersByStatus(status) {
        return new Promise(async (resolve, reject) => {
            const customers = await CustomerModel.findAll({
                where: {
                    status: status
                }
            })

            if (customers) {
                resolve(customers)
            } else {
                reject(new Error(`Can\'t find any customers`))
            }
        })
    }

    static getAllInvitedBy(id) {
        return new Promise(async (resolve, reject) => {
            const customers = await CustomerModel.findAll({
                where: {
                    invited_by: id
                }
            })

            if (customers) {
                resolve(customers)
            } else {
                reject(new Error(`Can\'t find any invited customers`))
            }
        })
    }
}

module.exports = Customer