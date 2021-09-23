
const managersAccount = require('../api/model/Admin/registerModelCompanyLogin')
const constants = require('../constants')

const adminCredentials = async (req, res, next) => {

    let credential = req.session.credential

    let accessType = await check(credential.public_id)

    if (!!credential.public_id && accessType === 'account' && constants[accessType] === credential.type )
        return next()

    else if (!!credential.public_id)
        return res.redirect('/error/401')

    else
        return res.redirect('/error/500')

}

const managerCredentials = async (req, res, next) => {

    let credential = req.session.credential

    if (!credential) return res.redirect('/error/404')

    let accessType = await check(credential.public_id)

    if (!!credential.public_id && accessType === 'manager' && constants[accessType] === credential.type )
        return next()

    else if (!!credential.public_id)
        return res.redirect('/error/401')

    else
        return res.redirect('/error/500')

}

const check = async (id) => {
    try {

        return await managersAccount
            .findOne({
                app_id: id
            })
            .then((response) => {
                if (response)
                    return response.type
                else
                    return false
            })
            .catch((err) => {
                if (err)
                    return false
            })

    } catch (error) {
        if (error) {
            return false
        }
    }
}

module.exports = {
    adminCredentials,
    managerCredentials
}