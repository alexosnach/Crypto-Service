const {Router} = require('express')
const NotificationCenter = require('../classes/Notification_class')
const router = Router()
const Settings = require('../classes/Settings_class')
const definitions = require('../utils/definitions')
const bot = require('../bot/index')


router.get('/', async (req, res) => {
    try {
        await Settings.init(123456789)
        const settings = await Settings.getSettings()

        res.render('settings', {
            title: 'Bot settings',
            isSettings: true,
            settings: settings
        })
    } catch (e) {
        res.status(500)
    }
})

router.post('/save', async (req, res) => {
    try {
        await Settings.saveSettings(req.body.bot_token, req.body.admin_id, req.body.premium_label, req.body.free_label, req.body.subscription_price, req.body.subscription_price_coeficient, req.body.max_subscribers)

        //startBot()
        
        res.redirect('/settings')
    } catch (e) {
        res.status(500)
    }
})

module.exports = router