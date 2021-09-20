const {
    companyTables
} = require("../server/manager/managerTables");

const {
    accessAccount
} = require('../server/adminLogins')

const {
    PrincipalULR,
    managerPagesList
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
        if (credential.type === 'manager')
            return res.redirect('/acc/dashboard/overview')
        else if (credential.type === 'account')
            return res.redirect('/f/a/c/dashboard/overview')
    }

    return res.render('templates/authentication/login', {error: "Access Denied"})
}

module.exports = {
    pageLoginAccess,
    accountCheckLoginAccess,
    dashboardCompanyAccess
}