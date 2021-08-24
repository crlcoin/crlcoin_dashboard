const express = require('express')
const router = express.Router()

const { errors } = require('../constants')

const {
    dashboardUse,
    dashboardAccess,
    companyTablesCreate,
    companyTablesConfigUpdate,
    companyTablesConfigDelete,
    companyPreloginCreate,
    companyPreloginDelete
} = require('../api/controllers/adminConntrollers')

const {
    onlyRequireDatas
} = require('../helper/olyRequireDatas')

router.get('/', (req, res) => { return res.render('templates/page/home') })
router.post('/contact', (req, res) => { return res.render('templates/page/home') })

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

router.get('/auth/register', (req, res) => {
    return res.render('templates/authentication/register')
})
router.post('/auth/register', (req, res) => {
    return res.render('templates/authentication/register')
})

router.get('/auth/logout', (req, res) => {
    return res.render('templates/authentication/logout')
})

// Manager
// router.get('/dashboard', (req, res) => {
//     return res.render('templates/dashboard/manager')
// })

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