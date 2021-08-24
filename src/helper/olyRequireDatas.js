const {
    requireTablesConfig,
} = require("../api/server/adminTables")

const {
    requirePrelogin,
} = require("../api/server/adminPrelogin")

const onlyRequireDatas = async (req, res, next) => {
    try {
        if (!req.params.page) return next()

        let params = req.params.page

        if ( params === "companies" ) {
            let response = await requirePrelogin()

            if (!!response && response.length > 0) {
                req.preloginData = response
            }
        } else {
            req.preloginData = false
        }

        if ( params === "app" || params === "tables" ) {
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

module.exports = {
    onlyRequireDatas
}