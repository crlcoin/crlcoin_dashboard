const {
    companyTables
} = require("../server/manager/managerTables");

const {
    accessAccount,
    resetPassword
} = require('../server/adminLogins')

const {
    PrincipalULR,
    managerPagesList,
    account,
    manager
} = require("../../constants")

const dashboardCompanyAccess = (req, res) => {
    let template = ""

    if (!!req.params.page) {
        managerPagesList.forEach(page => {
            if (page.toLowerCase() === req.params.page) {
                template = page
            }
        })
    }

    if (!!template) {
        return res.render('templates/dashboard/manager', {
            company: req.companySimpleData,
            page: {
                [template]: true,
                title: template,
                URL: PrincipalULR
            }
        })
    }

    return res.redirect('/error/404')
}

const pageLoginAccess = (req, res) => {
    return res.render('templates/authentication/login')
}

const accountCheckLoginAccess = async (req, res) => {

    let data = {
        email: req.body.emailaddress,
        password: req.body.accpass
    }

    let credential = await accessAccount(data)

    if (!!credential) {
        req.session.credential = credential
        if (credential.type === manager)
            return res.redirect('/acc/dashboard/overview')
        else if (credential.type === account)
            return res.redirect('/f/a/c/dashboard/overview')
    }

    return res.render('templates/authentication/login', {error: "Access Denied"})
}

const accountCheckLoginAndDestroySession = (req, res) => {
    if (req.session.credential) {
        req.session.destroy()
    }
    return res.render('templates/authentication/logout')
}

const pageRecoverPassword = (req, res) => {
    return res.render('templates/authentication/recover')
}

const createResetPasswordPermission = async (req, res) => {
    const { emailaddress } = req.body

    try {

        const use = await resetPassword(emailaddress)

        return res.redirect('/recover')

    } catch (error) {
        if (err)
            return res.redirect('/error/400')
    }
}

const registerNewPassword = async (req, res) => {

}

const createRegisterNewPassword = async (req, res) => {

}

module.exports = {
    pageLoginAccess,
    accountCheckLoginAccess,
    dashboardCompanyAccess,
    accountCheckLoginAndDestroySession,

    pageRecoverPassword,
    createResetPasswordPermission,
    registerNewPassword,
    createRegisterNewPassword
}