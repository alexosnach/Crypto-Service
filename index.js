const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const sequelize = require('./utils/database')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 80

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: 'views/layouts'
})

//Routes
const dashboardRoutes = require('./routes/dashboard')
const messagesRoutes = require('./routes/messages')
const settingsRoutes = require('./routes/settings')

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})

app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/', dashboardRoutes)
app.use('/messages', messagesRoutes)
app.use('/settings', settingsRoutes)

async function start() {
    try {
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log('Server is running on port: ' + PORT);
        })
    } catch (e) {
        console.log(e)
    }
}

start()