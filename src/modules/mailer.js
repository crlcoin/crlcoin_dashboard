const path = require('path')
const nodemailer = require('nodemailer')
const handlebars = require('nodemailer-express-handlebars')

const {
    mailer_HOST,
    mailer_PORT,
    mailer_USER,
    mailer_PASS
} = require('../config')

const transport = nodemailer.createTransport({
    host: mailer_HOST,
    port: mailer_PORT,
    auth: {
        user: mailer_USER,
        pass: mailer_PASS
    }
})

transport.use('compile', handlebars({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
}))

module.exports = transport