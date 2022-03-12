const Signal = require('../../classes/Signal_class')
const BinanceClass = require('../../classes/Binance_class')

class SendMessage {
    static sendMessageTo(id, messages, bot) {
        return new Promise(async (resolve, reject) => {
            for(var i = 0; i < messages.length; i++) {
                bot.sendMessage(id, messages[i].message, {
                    parse_mode: 'Markdown'
                })
            }
        })
    }
}

module.exports = SendMessage