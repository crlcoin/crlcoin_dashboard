const { PORT } = require('./config')
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const app = express()
const routes = require('./routes')
const handlebarsHelpers = require('./helper/handlebars')

// Redirect

// Config
app.use( express.json() )
app.use( express.urlencoded({ extended: false }) )
app.use( express.static( path.join(__dirname, '../public/') ) )

app.engine( 'handlebars', handlebars({
    defaultLayout: 'main',
    helpers: handlebarsHelpers
}) )
app.set( 'view engine', 'handlebars' )

// Routes
app.use(routes)

app.listen(PORT, () => { console.info( `Server ON ::: ${PORT}` ) })