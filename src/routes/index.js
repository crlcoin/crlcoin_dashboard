const express = require('express')
const router = express.Router()

const {
    home,
    errorPage
} = require('../api/controllers/landingPage')

const {
    pageLoginAccess,

    dashboardCompanyAccess,
    accountCheckLoginAccess,
    accountCheckLoginAndDestroySession,

    pageRecoverPassword,
    createResetPasswordPermission,
    registerNewPassword,
    createRegisterNewPassword,

    accountUpdatePassword,
    accountAdmUpdatePassword
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

    companyTablesDataCreate,
    companyTablesDataUpdate,

    companyPreloginCreate,
    companyPreloginDelete,

    companyRegisterAccess,
    companyCreateLogin,
    companyDeleteLogin,

    newHelper,
    updateHelp,
    deleteHelp
} = require('../api/controllers/adminControllers')

const {
    onlyRequireDatas,
    checkRegisterAccess,
    checkRegisterCreate
} = require('../helper/olyRequireDatas')

const {
    checkMessagesData
} = require('../helper/checkMessage')

const {
    adminCredentials,
    managerCredentials,
    checkLogin
} = require('../helper/checkAccessCredentials')

router.get('/', home)
router.post('/contact', checkMessagesData, saveMessageData)

// authentication
router.get('/auth/register', checkRegisterAccess, companyRegisterAccess)
router.post('/auth/register', checkRegisterCreate, companyCreateLogin)

router.get('/recover', pageRecoverPassword)
router.post('/recover', createResetPasswordPermission)

router.get('/auth/recover', registerNewPassword)
router.post('/auth/recover', createRegisterNewPassword)

router.get('/logout', accountCheckLoginAndDestroySession)

router.get('/login', checkLogin, pageLoginAccess)
router.post('/login', accountCheckLoginAccess)

// Manager
router.get('/acc/dashboard/:page', managerCredentials, dashboardCompanyAccess)
router.post('/acc/dashboard/account/change-password', managerCredentials, accountUpdatePassword)

// Admin
router.get('/f/a/c/dashboard/:page', adminCredentials, onlyRequireDatas, dashboardAccess)
router.get('/f/a/e/dashboard/use/:page', adminCredentials, dashboardUse)

router.post('/f/a/c/dashboard/account/change-password', adminCredentials, accountUpdatePassword)

router.post('/f/a/c/dashboard/create/tables', companyTablesCreate)
router.post('/f/a/c/dashboard/update/tables', companyTablesConfigUpdate)
router.post('/f/a/c/dashboard/delete/tables', companyTablesConfigDelete)

router.post('/f/a/c/dashboard/create/table-data', companyTablesDataCreate)
router.post('/f/a/c/dashboard/update/table-data', companyTablesDataUpdate)

router.post('/f/a/c/dashboard/create/companies', companyPreloginCreate)
router.post('/f/a/c/dashboard/delete/companies', companyPreloginDelete)

router.post('/f/a/c/dashboard/create/helper', newHelper)
router.post('/f/a/c/dashboard/update/helper', updateHelp)
router.post('/f/a/c/dashboard/delete/helper', deleteHelp)

router.post('/f/a/c/dashboard/delete/companies-register', companyDeleteLogin)

router.post('/f/a/c/dashboard/delete/message', deleteMessage)
router.post('/f/a/c/dashboard/update/message-status', updateMessageStatus)

// Errors
router.get('/error/:code', errorPage)
router.all('*', errorPage)

module.exports = router