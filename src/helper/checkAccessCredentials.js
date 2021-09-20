
const adminCredentials = (req, res, next) => {
    try {

        let credential = req.session.credential

        console.log( credential )

        if (!!credential && credential.type === 'account')
            return next()
        else
            return res.redirect('/login')

    } catch (error) {
        if (error)
            return false
    }
}

const managerCredentials = (req, res, next) => {
    try {

        let credential = req.session.credential

        console.log( credential )

        if (!!credential && credential.type === 'manager')
            return next()
        else
            return res.redirect('/login')

    } catch (error) {
        if (error)
            return false
    }
}

module.exports = {
    adminCredentials,
    managerCredentials
}