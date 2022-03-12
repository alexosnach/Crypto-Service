const {Router} = require('express')
const router = Router()
const Message = require('../classes/Message_class')
const definitions = require('../utils/definitions')


router.get('/', async (req, res) => {
    try {
        const messages = await Message.getAll()
    
        res.render('messages', {
            title: 'Bot Messages',
            isMessages: true,
            messages: messages,
            messageStatus: definitions.MESSAGE_TYPE
        })
    } catch (e) {
        res.status(500)
    }
})

router.post('/getmessage', async (req, res) => {
    console.log(req.body)
    try {
        const message = await Message.getById(req.body.id)
        res.send(message)
    } catch (e) {
        res.status(500)
    }
})

router.post('/', async (req, res) => {
    try {
        if (req.body.isEdit !== 'yes') {
            await Message.save(req.body.message, req.body.message_type)
        }
    
        res.redirect('/messages')
    } catch (e) {
        res.status(500)
    }
})

router.post('/edit', async (req, res) => {
    console.log(req.body.id, req.body.message)

    try {
        await Message.update(req.body.id, req.body.message)
        
        res.redirect('/messages')
    } catch (e) {
        res.status(500)
    }
})

router.post('/delete', async (req, res) => {
    try {
        await Message.delete(req.body.id)
    
        res.redirect('/messages')
    } catch (e) {
        res.status(500)
    }
})

module.exports = router