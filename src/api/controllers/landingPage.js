
const { errors } = require('../../constants')

const pages = {
    home: (req, res) => {
        return res.render('templates/page/home')
    },
    errorPage: (req, res) => {
        let result
        if (!!req.params.code && !!errors[req.params.code]) {
            result = errors[req.params.code]
        } else {
            result = errors['404']
        }
        return res.status(result.status).render('templates/error/error', {code: result.status, message: result.message})
    }
}

module.exports = pages