const {
    permissionCaracterListSupport
} = require("../constants")

const {
    requireTablesConfig,
} = require("../api/server/adminTables")

const {
    requirePrelogin,
} = require("../api/server/adminPrelogin");

const {
    requireManagers
} = require('../api/server/adminRequireManagers')

const {
    requireMessages
} = require('../api/server/adminMessages')

const {
    requireHelpers
} = require('../api/server/adminHelpers')

const onlyRequireDatas = async (req, res, next) => {
    try {
        if (!req.params.page) next()

        let params = req.params.page

        if (params === "messages") {
            let response = await requireMessages()

            if (!!response && response.length > 0) {
                req.contactMe = response
            }
        } else {
            req.contactMe = false
        }

        if (params === "companies") {
            let response = await requireManagers()

            if (!!response && response.length > 0) {
                req.companies = response
            }
        } else {
            req.companies = false
        }

        if (params === "help") {
            let response = await requireHelpers()

            if (!!response && response.length > 0) {
                req.helpers = response
            }
        } else {
            req.helpers = false
        }

        if (params === "overview" || params === "companies") {
            let response = await requirePrelogin()

            if (!!response && response.length > 0) {
                req.preloginData = response
            }
        } else {
            req.preloginData = false
        }

        if (params === "overview" || params === "tables") {
            let response = await requireTablesConfig()

            if (!!response && response.length > 0) {

                response.forEach((table) => {
                    table.columnsCount = table.columns.length
                })

                req.tablesConfig = response
            }
        } else {
            req.tablesConfig = false
        }

        next()
    } catch (e) {
        if (e) {
            next()
        }
    }
};

const checkLoginAccess = async (req, res, next) => {
    try {

        if (!req.query.refLink) return res.redirect('/error/404')

        let params = (req.query.refLink).replace(/ /g, '+')

        if (params.replace(permissionCaracterListSupport, '') !== "") {
            return res.redirect('/error/404')
        }

        let count = 0

        for (const letter of params) {
            if (letter === "+" || letter === "@") {
                count++
            }
        }

        if (params.includes('@crlcoin') && count == 3) {
            let response = await requirePrelogin(params)

            if (response.permission === params) {
                req.permission = response.permission
                next()
            } else {
                return res.redirect('/error/404')
            }
        } else {
            return res.redirect('/error/404')
        }

    } catch (error) {
        if (error) {
            return res.redirect('/error/404')
        }
    }
}

const checkLoginCreate = async (req, res, next) => {
    try {

        if (!req.body.permission || !req.body.name || !req.body.emailaddress || !req.body.newPassword || !req.body.confirmNewPassword || !req.body.terms) {
            req.permission = false
            if (!!req.body.permission) {
                req.responsePermission = req.body.permission
            }
            req.responseMessage = 'All fields are required'
            return next()
        }

        let params = (req.body.permission).replace(/ /g, '+')

        if (!!params && params.replace(permissionCaracterListSupport, '') !== "") {
            req.permission = false
            if (!!req.body.permission) {
                req.responsePermission = req.body.permission
            }
            req.responseMessage = 'Permission denied'
            return next()
        }

        let count = 0

        for (const letter of params) {
            if (letter === "+" || letter === "@") {
                count++
            }
        }

        if (params.includes('@crlcoin') && count === 3) {
            return await requirePrelogin(params)
                .then(response => {

                    if (!response) {
                        req.permission = false
                        if (!!req.body.permission) {
                            req.responsePermission = req.body.permission
                        }
                        req.responseMessage = 'Permission denied'
                        return next()
                    }

                    if (req.body.emailaddress === response.email) {
                        req.permission = true
                        res.responseType = response.type
                        return next()
                    } else {
                        req.permission = false
                        if (!!req.body.permission) {
                            req.responsePermission = req.body.permission
                        }
                        req.responseMessage = 'Check your information'
                        return next()
                    }

                })
                .catch(err => {
                    if (err) {
                        console.log(err)
                        return res.redirect('/error/500')
                    }
                })
        } else {
            req.permission = false
            if (!!req.body.permission) {
                req.responsePermission = req.body.permission
            }
            req.responseMessage = 'Permission denied'
            return next()
        }

    } catch (error) {
        if (error) {
            return res.redirect('/error/500')
        }
    }
}

module.exports = {
    onlyRequireDatas,
    checkLoginAccess,
    checkLoginCreate
}