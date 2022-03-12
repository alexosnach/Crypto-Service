const Settings = require("../../classes/Settings_class")
const Customer = require("./Customer_class")


class Subscription {
    static generatePriceByTelegram(id) {
        return new Promise(async (resolve, reject) => {
            await Settings.init(123456789)
            const allInvited = await Customer.getAllInvitedBy(id)
            const settings = await Settings.getSettings()

            let paymentNumber = 0

            allInvited.forEach(invitedCustomer => {
                if (invitedCustomer.is_subscriber === 1) {
                    paymentNumber++
                }
            });

            const regularPrice = settings.subscription_price

            let newPrice = (regularPrice - (regularPrice * ((paymentNumber > 5 ? 5 : paymentNumber) * 10) * 1.6)/100).toFixed();

            resolve(newPrice)
        })
    }

    
}

module.exports = Subscription