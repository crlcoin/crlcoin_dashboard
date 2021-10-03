const {
    companyTables
} = require("../server/manager/managerTables");

const {
    requireOneAccount
} = require("../server/manager/managerAccount");

const {
    accessAccount,
    resetPassword,
    checkResetPasswordToken,
    createNewPassword,

    updateAccountPassword
} = require('../server/adminLogins')

const {
    PrincipalULR,
    managerPagesList,
    account,
    manager
} = require("../../constants")

const dashboardCompanyAccess = async (req, res) => {
    let template = ""
    let manager
    let table

    if (!!req.params.page) {
        managerPagesList.forEach(page => {
            if (page.toLowerCase() === req.params.page) {
                template = page
            }
        })
    }

    manager = await requireOneAccount(req.session.credential.public_id)

    if (!!template) {
        return res.render('templates/dashboard/manager', {
            company: manager,
            page: {
                [template]: true,
                title: template,
                URL: PrincipalULR
            },
            tableColumns: 'tableData'
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
        delete req.session.credential
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

        await resetPassword(emailaddress)
        return res.render('templates/authentication/confirmemailaddress', {email: emailaddress})

    } catch (error) {
        if (error) {
            return res.redirect('/error/400')
        }

    }
}

const registerNewPassword = async (req, res) => {

    const { rc_tk } = req.query

    if (!rc_tk || !rc_tk.replace(/[^a-z0-9]/gi, ''))
        return res.redirect('/error/404')

    let token = await checkResetPasswordToken({token: rc_tk})

    if (!token)
        return res.redirect('/error/404')

    return res.render('templates/authentication/recoverCreatePass', {token})

}

const createRegisterNewPassword = async (req, res) => {
    const data = req.body

    let result = await createNewPassword(data)

    if(result.status)
        return res.redirect('/login')

    return res.render('templates/authentication/recoverCreatePass', {token: data.token, message: result.message})
}

const accountUpdatePassword = async (req, res) => {
    let response
    const {
        referenceData,
        currentEmail,
        currentPassword,
        newPassword,
        confirmPassword
    } = req.body

    if (req.session.credential.public_id === referenceData) {

        response = await updateAccountPassword({
            referenceData: referenceData,
            currentEmail: currentEmail,
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        })

    }

    if (!!response && response.status) {
        if (req.session.credential) {
            delete req.session.credential
            req.session.destroy()
        }

        return res.status(200).json({status: true})
    }

    return res.status(400).json({status: false})
}

module.exports = {
    pageLoginAccess,
    accountCheckLoginAccess,
    dashboardCompanyAccess,
    accountCheckLoginAndDestroySession,

    pageRecoverPassword,
    createResetPasswordPermission,
    registerNewPassword,
    createRegisterNewPassword,

    accountUpdatePassword
}