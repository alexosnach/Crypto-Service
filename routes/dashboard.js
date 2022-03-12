const {Router} = require('express')
const TelegramBot = require('node-telegram-bot-api')
const router = Router()
const Signal = require('../classes/Signal_class')
const definitions = require('../utils/definitions')
const CustomerClass = require('../bot/Classes/Customer_class')
const BinanceClass = require('../classes/Binance_class')
const SignalClass = require('../classes/Signal_class')
const MessageClass = require('../bot/Classes/SendMessage_class')
let sendTelegramMessage = require('../bot/index');
const { Sign } = require('crypto')
const helper = require("../utils/helper")

router.get('/', async (req, res) => {
    const activeSignals = await SignalClass.getSignalsByStatus(definitions.SIGNAL.STATUS.PROGRESS)
    const waitingSignals = await SignalClass.getSignalsByStatus(definitions.SIGNAL.STATUS.WAIT)
    const activeCustomers = await CustomerClass.getCustomersByStatus(definitions.CUSTOMER.STATUS.ACTIVE)
    const allCustomers = await CustomerClass.getAllCustomers()

    let activeSignalsNumber = 0
    let activeCustomersNumber = 0
    let allCustomersNumber = 0
    let waitingAlertsNumber = 0

    for (var i = 0; i < activeSignals.length; i++) {
        activeSignalsNumber++;
    }

    for (var i = 0; i < waitingSignals.length; i++) {
        waitingAlertsNumber++;
    }

    for (var i = 0; i < activeCustomers.length; i++) {
        activeCustomersNumber++;
    }

    for (var i = 0; i < allCustomers.length; i++) {
        allCustomersNumber++;
    }

    res.render('index', {
        title: 'Bot Dashboard',
        isDashboard: true,
        audienceType: definitions.SIGNAL_AUDIENCE_TYPE,
        activeSignals: activeSignals,
        waitingSignals: waitingSignals,
        numbers: {
            activeSignalsNumber: activeSignalsNumber,
            activeCustomersNumber: activeCustomersNumber,
            allCustomersNumber: allCustomersNumber,
            activeCustomersPercent: ((activeCustomersNumber / allCustomersNumber) * 100).toFixed(2),
            waitingAlertsNumber: waitingAlertsNumber
        }
    })
})

router.post('/sendMessage', async (req, res) => {
    let dealType = req.body.entry1 > req.body.target1 ? "Sell" : "Buy";
    let fields = {
        currentPrice: req.body.currentPrice ? req.body.currentPrice : null,
        text: req.body.textarea ? req.body.textarea : null,
        dealType: dealType ? dealType : null,
        exchange: req.body.exchange ? req.body.exchange : null,
        currency1: req.body.currency1 ? req.body.currency1 : null,
        currency2: req.body.currency2 ? req.body.currency2 : null,
        entry1: req.body.entry1 ? req.body.entry1 : null,
        entry2: req.body.entry2 ? req.body.entry2 : null,
        target1: req.body.target1 ? req.body.target1 : null,
        target2: req.body.target2 ? req.body.target2 : null,
        target3: req.body.target3 ? req.body.target3 : null,
        target4: req.body.target4 ? req.body.target4 : null,
        target5: req.body.target5 ? req.body.target5 : null,
        target6: req.body.target6 ? req.body.target6 : null,
        target7: req.body.target7 ? req.body.target7 : null,
        stopLose: req.body['stop_lose'] ? req.body['stop_lose'] : null,
        audience: req.body.type ? req.body.type : null
    }
    if (req.files) {
        fields.image = req.files.image
    }
    
    switch (req.body.type) {
        case definitions.SIGNAL_AUDIENCE_TYPE.ALL_USERS:
            const allCustomers = await CustomerClass.getAllCustomers() 

            allCustomers.forEach(async customer => {
                if (fields.currency1 != null) {
                    await sendSignalMessageFromDasboardTo(customer, fields, '🔵')
    
                    const signal = await Signal.save(fields)
                    await Signal.addToHystory(signal.id, customer.telegram_id)
                } else {
                    await sendSignalMessageFromDasboardTo(customer, fields, '🔵')
    
                }
            });
            res.redirect('/')

            break;
        case definitions.SIGNAL_AUDIENCE_TYPE.SUBSCRIBERS:
            const allSubscribers = await CustomerClass.getAllSubscribers() 
                
            allSubscribers.forEach(async customer => {
                if (fields.currency1 != null) {
                    await sendSignalMessageFromDasboardTo(customer, fields, '🟡')
    
                    const signal = await Signal.save(fields)
                    await Signal.addToHystory(signal.id, customer.telegram_id)
                } else {
                    await sendSignalMessageFromDasboardTo(customer, fields, '🟡')
                }
            });

            res.redirect('/')
            break;
        case definitions.SIGNAL_AUDIENCE_TYPE.FREE_USERS:
            const allFreeCustomers = await CustomerClass.getAllFreeCustomers() 
                
            allFreeCustomers.forEach(async customer => {
                if (fields.currency1 != null) {
                    await sendSignalMessageFromDasboardTo(customer, fields, '🔵')
    
                    const signal = await Signal.save(fields)
                    await Signal.addToHystory(signal.id, customer.telegram_id)
                } else {
                    await sendSignalMessageFromDasboardTo(customer, fields, '🔵')
                }
            });

            res.redirect('/')
            break;
    }
})

router.post('/getCurrencyPrice', async (req, res) => {
    const price = await BinanceClass.getPairPrice(req.body.pair)

    res.send({'price': price});
})

router.post('/closeSignal', async (req, res) => {
    await Signal.closeSignal(req.body.id)
    await sendCloseMessageBy(req.body.id)

    res.send({'id': req.body.id});
})

function sendSignalMessageFromDasboardTo(customer, fields, contentLabel) {
    return new Promise((resolve, reject) => {
        if (customer.status !== definitions.CUSTOMER.STATUS.STOPPED) {
            let message = `${fields.currency1 ? `Here is\nType: ${fields.dealType}\nCurrency: ${fields.currency1}/${fields.currency2} ${fields.exchange ? `${fields.exchange}` : ``}\n${fields.currentPrice ? `Current price: ${fields.currentPrice}`: ``}\n${fields.entry2 ? `Entry zone: ${fields.entry1}-${fields.entry2}` : `Entry price: ${fields.entry1}`}\n\nTarget 1: ${fields.target1} ${fields.target2 ? `\nTarget 2: ${fields.target2}` : ``} ${fields.target3 ? `\nTarget 3: ${fields.target3}` : ``} ${fields.target4 ? `\nTarget 4: ${fields.target4}` : ``} ${fields.target5 ? `\nTarget 5: ${fields.target5}` : ``} ${fields.target6 ? `\nTarget 6: ${fields.target6}` : ``} ${fields.target7 ? `\nTarget 7: ${fields.target7}` : ``}\n\nStop: ${fields.stopLose}\n\n${fields.text ? `${fields.text}` : ``}` : `${fields.text}`}`;
            
            
            sendTelegramMessage(customer.telegram_id, `${contentLabel} ` + message, (fields.image ? fields.image.data : null)).then(() => {
                resolve()
            }).catch(function() {
                CustomerClass.changeCustomerStatus(customer.telegram_id, definitions.CUSTOMER.STATUS.STOPPED)
            })
        }
    });
}

function sendCloseMessageBy(signalId) {
    return new Promise(async (resolve, reject) => {
        const signal = await Signal.getSignalBy(signalId)
        const createdDate = helper.getDateFormat(signal.createdAt);
        const price = await BinanceClass.getPairPrice(signal.curr1 + signal.curr2)
        const customers = await Signal.getCustomersWhoGetSignalBy(signalId)

        let message = `📛 Deleting order ${signal.curr1}/${signal.curr2} Showed: ${createdDate}\n\n_Current price: ${price}\nEntry price: ${signal.entry1}\nSlop Lose: ${signal.stop_lose}_\n\n*Close ${signal.deal_type}* limit order now following validity expiration!`

        customers.forEach(customer => {
            sendTelegramMessage(customer.telegram_id, message).then(() => {
                resolve()
            }).catch(function() {
                CustomerClass.changeCustomerStatus(customer.telegram_id, definitions.CUSTOMER.STATUS.STOPPED)
            })
        })
    })
}

module.exports = router