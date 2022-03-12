const CustomerModel = require('../../models/customer')
const definitions = require('../../utils/definitions')
const CustomerClass = require('./Customer_class')

class Affiliate {
    static getInfo(id, bot) {
        return new Promise(async (resolve, reject) => {
            const message = 'Here is your affiliate program.\n\nThe program can help you pay less for using the subscription.\n\n*How does it work?*\nIn the next message, we sent you your unique link. If you share this link with other people and they come to the bot through this link and buy the subscription, your subscription will cost you less money.\n'

            bot.sendMessage(id, message, {
                parse_mode: 'Markdown'
            }).then(() => {
                CustomerClass.getAllInvitedBy(id).then(customers => {
                    var invitedNumber = 0;
                    var paymentNumber = 0;
    
                    customers.forEach(customer => {
                        invitedNumber++;
    
                        if (customer.is_subscriber == 1) {
                            paymentNumber++;
                        }
                    })
            
                    resolve({'invitedNumber': invitedNumber, 'paymentNumber': paymentNumber})
                }).catch(e => reject(e))
            }).catch(e => reject(e))
        })
    }

    static sendCurrentStatus(id, bot) {
        return new Promise(async (resolve, reject) => {
            bot.sendMessage(id, `Your current affiliate status is:\nInvited: *${invitedNumber}*\nBought: *${paymentNumber}*`, {
                parse_mode: 'Markdown'
            }).then(() => resolve()).catch(e => reject(e));
        })
    }
}

module.exports = Affiliate 