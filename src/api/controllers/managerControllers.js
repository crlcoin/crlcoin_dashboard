const {
    companyTables
} = require("../server/manager/managerTables");

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
            company: {
                name: "Name to test"
            },
            page: {
                [template]: true,
                title: template,
                PrincipalULR: PrincipalULR
            }
        })
    }

    return res.redirect('/error/404')
}

module.exports = {
    dashboardCompanyAccess
}