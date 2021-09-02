const express = require('express')
const router = express.Router()

const { errors } = require('../constants')

const {
    // saveMessageData,
    // dashboardUse,
    dashboardCompanyAccess,
    // companyTablesCreate,
    // companyTablesConfigUpdate,
    // companyTablesConfigDelete,
    // companyPreloginCreate,
    // companyPreloginDelete,
    // companyCreateLogin
} = require('../api/controllers/managerControllers')

const {
    saveMessageData,
    dashboardUse,
    dashboardAccess,
    companyTablesCreate,
    companyTablesConfigUpdate,
    companyTablesConfigDelete,
    companyPreloginCreate,
    companyPreloginDelete,
    companyRegisterAccess,
    companyCreateLogin
} = require('../api/controllers/adminControllers')

const {
    onlyRequireDatas,
    checkLoginAccess,
    checkLoginCreate
} = require('../helper/olyRequireDatas')

const {
    checkMessagesData
} = require('../helper/checkMessage')

router.get('/', (req, res) => { return res.render('templates/page/home') })
router.post('/contact', checkMessagesData, saveMessageData)

// authentication
router.get('/login', (req, res) => {
    return res.render('templates/authentication/login')
})
router.post('/login', (req, res) => {
    return res.render('templates/authentication/login')
})

router.get('/recover', (req, res) => {
    return res.render('templates/authentication/recover')
})
router.post('/recover', (req, res) => {
    return res.render('templates/authentication/confirmemailaddress', {email: req.body.emailaddress})
})

router.get('/auth/register', checkLoginAccess, companyRegisterAccess)
router.post('/auth/register', checkLoginCreate, companyCreateLogin)

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

// Errors
router.get('/error/:code', (req, res) => {
    let response
    if (!!req.params.code && !!errors[req.params.code]) {
        response = errors[req.params.code]
    } else {
        response = errors['404']
    }
    return res.status(response.status).render('templates/error/error', {code: response.status, message: response.message})
})

router.all('*', (req, res) => {
    return res.status(404).render('templates/error/error', {code: errors['404'].status, message: errors['404'].message})
})

module.exports = router