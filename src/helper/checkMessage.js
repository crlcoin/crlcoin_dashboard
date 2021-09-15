const fetch = require('node-fetch')

const {
    listOfAllowedCharactersEmail,
} = require('../constants')

const {
    CAPTCHA_SECRET
} = require('../config')

function checkEmail(email) {
    email = email.replace( listOfAllowedCharactersEmail, '')
    return !email
}

const checkMessagesData = async (req, res, next) => {

    let newObject = {}

    if (!req.body.name) {
        return res.status(400).json({ message: "The 'Name' field is required and empty." })
    } else {
        newObject.name = req.body.name
    }

    if (!req.body.email) {
        return res.status(400).json({ message: "The 'Email address' field is required and empty." })
    } else if ( checkEmail(req.body.email) ) {
        newObject.email = req.body.email
    } else {
        return res.status(400).json({ message: "The 'Email address' format is not acceptable"})
    }

    if (!req.body.subject) {
        return res.status(400).json({ message: "The 'Subject' field is required and empty." })
    } else {
        newObject.subject = req.body.subject
    }

    if (!!req.body.phone) {
        let phoneNumber = (req.body.phone).replace(/[^+0-9]/, '')
        newObject.phone_number = phoneNumber
    }

    if (!req.body.message) {
        return res.status(400).json({ message: "The 'Subject' field is required and empty." })
    } else {
        newObject.message = req.body.message
    }

    if (!req.body.recaptcha) {
        return res.status(400).json({ message: "'reCAPTCHA' is required." })
    }

    await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET}&response=${req.body.recaptcha}`, {
            method: 'POST'
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if (response.success === true) {
                req.messageData = newObject
                return next()
            } else if (response.success = false) {
                return res.status(400).json({ message: "'reCAPTCHA' failed verification." })
            } else {
                return res.status(500).json({})
            }
        })
        .catch((err) => {
            if (err) {
                return res.status(500).json({})
            }
        })
}

module.exports = {
    checkMessagesData
}