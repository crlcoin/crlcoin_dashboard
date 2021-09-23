const { PORT, SESSION_SECRET } = require('./config')
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const app = express()
const routes = require('./routes')
const handlebarsHelpers = require('./helper/handlebars')

// Session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use( express.json() )
app.use( express.urlencoded({ extended: false }) )
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