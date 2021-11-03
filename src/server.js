const { PORT, SESSION_SECRET, IS_PRODUCTION } = require('./config')
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')
const handlebarsHelpers = require('./helper/handlebars')

const app = express()
app.use( helmet() )
app.use( helmet.contentSecurityPolicy({
    useDefaults:true,
    directives: {
        "script-src": ["'self'", "https://www.google.com/recaptcha/", "https://www.gstatic.com/recaptcha/", "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"],
        "frame-src": ["'self'", "https://www.google.com/recaptcha/", "https://recaptcha.google.com/recaptcha/"]
    }
}) )

// Session
app.use(session({
    name: "wbssid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: IS_PRODUCTION,
        maxAge: 3600000 * 3,
    }
}))

const whitelist = ['https://crlcoin-example.herokuapp.com/']
const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !IS_PRODUCTION) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use( cors(corsOptions) )

app.use( express.json() )
app.use( express.urlencoded({ extended: true }) )
app.use( express.static( path.join(__dirname, '../public/') ) )

app.engine( 'handlebars', handlebars({
    defaultLayout: 'main',
    helpers: handlebarsHelpers
}) )
app.set( 'view engine', 'handlebars' )

app.use(routes)

app.listen(PORT, () => {
    console.log( `Server ON ::: ${PORT}` )
})