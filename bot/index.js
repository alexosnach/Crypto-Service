const TelegramBot = require("node-telegram-bot-api")
const definitions = require('../utils/definitions')
const CustomerClass = require('./Classes/Customer_class')
const MessageClass = require('../classes/Message_class')
const SendMessageClass = require('./Classes/SendMessage_class')
const AffiliateClass = require('./Classes/Affiliate_class')
const SettingsClass = require('../classes/Settings_class')
const helper = require("../utils/helper")
const Subscription = require("./Classes/Subscription_class")
const NotificationCenter = require("../classes/Notification_class")


function startBot() {
    const result = SettingsClass.getBotToken()
    result.then(token => {
        const bot = new TelegramBot(token, {
            polling: true
        });
        
        console.log('Bot is working...');
        
        module.exports = function sendTelegramMessage(chat_id, message, photo = null) {
            return new Promise(function(resolve, reject) {
                if(photo) {
                    bot.sendPhoto(chat_id, photo, {
                        caption: message
                    }).then(() => {
                        resolve();
                    }).catch((e) => {
                        reject(e);
                    });
                } else {
                    bot.sendMessage(chat_id, message, {
                        parse_mode: 'Markdown'
                    }).then(() => {
                        resolve();
                    }).catch(e => {
                        reject(e);
                    })
                }
            })
        }
        
        bot.onText(/\/start (.+)/, async (msg, [source, match]) => {
            await CustomerClass.save(msg.chat.id, msg.from.username, msg.from.first_name, match)
        });
        
        bot.onText(/\/start/, async (msg) => {
            bot.sendChatAction(msg.chat.id, 'typing')
        
            setTimeout(async () => {
                await CustomerClass.save(msg.chat.id, msg.from.username, msg.from.first_name)
            }, 3000)
            const messages = await MessageClass.getMessagesByType(definitions.MESSAGE_TYPE.WELCOME)
            await SendMessageClass.sendMessageTo(msg.chat.id, messages, bot)
        
            bot.sendChatAction(msg.chat.id, 'cancel')
        });
        
        bot.onText(/\/affiliate/, async (msg) => {
            bot.sendChatAction(msg.chat.id, 'typing')
        
            AffiliateClass.getInfo(msg.chat.id, bot).then(info => {
                bot.sendMessage(msg.chat.id, `https://t.me/${definitions.BOT_NAME}?start=${msg.chat.id}`, {
                    disable_web_page_preview: true
                }).then(() => {
                    if (info.invitedNumber > 0) {
                        bot.sendMessage(msg.chat.id, `Your current affiliate status is:\nInvited: *${info.invitedNumber}*\nBought: *${info.paymentNumber}*`, {
                            parse_mode: 'Markdown'
                        }).catch(e => reject(e));
                    }
                }).catch(e => console.log(e))
            }).catch(e => console.log(e))
        
            bot.sendChatAction(msg.chat.id, 'cancel')
        });
    
        bot.onText(/\/subscription/, async (msg) => {
            bot.sendChatAction(msg.chat.id, 'typing')
    
            const message = await MessageClass.getMessagesByType(definitions.MESSAGE_TYPE.NO_SUBSCRIPTION)
            if (message[0]) {
                const fullMessage = helper.putTextIntoVariables(message[0].message)
            }
    
            // bot.sendMessage(msg.chat.id, fullMessage, {
            //     parse_mode: 'Markdown'
            // })
    
            const subscriptionPrice = await Subscription.generatePriceByTelegram(msg.chat.id)
            console.log(subscriptionPrice);
    
            bot.sendChatAction(msg.chat.id, 'cancel')
        })
        
    })
}

const notificationCenter = new NotificationCenter()
notificationCenter.addObserver(definitions.EVENTS.UPDATE_SETTINGS, data => {
    console.log('Start Start');
    //startBot()
})

startBot()