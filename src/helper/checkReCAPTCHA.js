const fetch = require('node-fetch')

const {
    CAPTCHA_SECRET
} = require('../config')

const check = async (captcha) => {
    try {

        return await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET}&response=${captcha}`, {
            method: 'POST'
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if (response.success) {
                return true
            } else {
                console.log({ status: false, message: "'reCAPTCHA' :: failed verification." })
                return false
            }
        })
        .catch((err) => {
            if (err) {
                console.log({ status: false, message: "'reCAPTCHA' :: failed verification." })
                return false
            }
        })

    } catch (error) {
        if (error) {
            console.log({ status: false, message: "'reCAPTCHA' ::: failed verification." })
            return false
        }
    }
}

module.exports = check