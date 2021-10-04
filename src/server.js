const { PORT, SESSION_SECRET, IS_PRODUCTION } = require('./config')
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const handlebarsHelpers = require('./helper/handlebars')

// Session
app.use(session({
    name: "wbssid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: IS_PRODUCTION,
        maxAge: 1000 * 60 * 60 * 3,
    }
}))

app.use(cors())
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