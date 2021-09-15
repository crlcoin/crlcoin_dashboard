const express = require('express')
const router = express.Router()

const {
    home,
    errorPage
} = require('../api/controllers/landingPage')

const {
    dashboardCompanyAccess,
} = require('../api/controllers/managerControllers')

const {
    saveMessageData,
    deleteMessage,
    updateMessageStatus,

    dashboardAccess,
    dashboardUse,

    companyTablesCreate,
    companyTablesConfigUpdate,
    companyTablesConfigDelete,

    companyPreloginCreate,
    companyPreloginDelete,

    companyRegisterAccess,
    companyCreateLogin,
    companyDeleteLogin,
} = require('../api/controllers/adminControllers')

const {
    onlyRequireDatas,
    checkLoginAccess,
    checkLoginCreate
} = require('../helper/olyRequireDatas')

const {
    checkMessagesData
} = require('../helper/checkMessage')

router.get('/', home)
router.post('/contact', checkMessagesData, saveMessageData)

// authentication
router.get('/login', (req, res) => {
    return res.render('templates/authentication/login')
})
router.post('/login', (req, res) => {
    return res.render('templates/authentication/login')
})

router.get('/auth/register', checkLoginAccess, companyRegisterAccess)
router.post('/auth/register', checkLoginCreate, companyCreateLogin)

router.get('/recover', (req, res) => {
    return res.render('templates/authentication/recover')
})
router.post('/recover', (req, res) => {
    return res.render('templates/authentication/confirmemailaddress', {email: req.body.emailaddress})
})

router.get('/auth/logout', (req, res) => {
    return res.render('templates/authentication/logout')
})

// Manager
router.get('/acc/dashboard/:page', dashboardCompanyAccess)

// Admin
router.get('/f/a/c/dashboard/:page', onlyRequireDatas, dashboardAccess)

router.get('/f/a/e/dashboard/use/:page', dashboardUse)
router.post('/f/a/c/dashboard/create/tables', companyTablesCreate)
router.post('/f/a/c/dashboard/update/tables', companyTablesConfigUpdate)
router.post('/f/a/c/dashboard/delete/tables', companyTablesConfigDelete)

router.post('/f/a/c/dashboard/create/companies', companyPreloginCreate)
router.post('/f/a/c/dashboard/delete/companies', companyPreloginDelete)

router.post('/f/a/c/dashboard/delete/companies-register', companyDeleteLogin)

router.post('/f/a/c/dashboard/delete/message', deleteMessage)
router.post('/f/a/c/dashboard/update/message-status', updateMessageStatus)

// Errors
router.get('/error/:code', errorPage)
router.all('*', errorPage)

module.exports = router