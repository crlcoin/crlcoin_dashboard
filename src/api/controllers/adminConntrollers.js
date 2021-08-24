const {
    PrincipalULR,
    PagesList,
    ActionsList,
} = require('../../constants')

const {
    createTablesConfig,
    deleteTableConfig,
    requireTablesConfig,
    updateTableConfig
} = require('../server/adminTables');

const {
  createPrelogin,
  deletePrelogin,
} = require("../server/adminPrelogin");

const dashboardUse = async (req, res) => {
    let template = ""
    let id = req.query.id || ""
    let table_id = req.query.refLink || ""
    let page = req.params.page || ""

    if (!!id && ActionsList.includes(id) && !!table_id) {

        if (!!page) {
            PagesList.forEach(page => {
                if (page.toLowerCase() === req.params.page) {
                    template = id + page
                }
            })
        }

        if (!!template) {
            let response = await requireTablesConfig(table_id);
            return res.render('templates/dashboard/admin', {
                page: {
                    [template]: true,
                    title: template,
                    PrincipalULR: PrincipalULR
                },
                tableConfig: response
            })
        }

    }

    return res.redirect('/error/404')
}

const dashboardAccess = (req, res) => {
    let template = ""

    if (!!req.params.page) {
        PagesList.forEach(page => {
            if (page.toLowerCase() === req.params.page) {
                template = page
            }
        })
    }

    if (!!template) {
        return res.render('templates/dashboard/admin', {
            page: {
                [template]: true,
                title: template,
                PrincipalULR: PrincipalULR
            },
            preloginData: req.preloginData,
            tablesConfig: req.tablesConfig
        })
    }

    return res.redirect('/error/404')
}

const companyTablesCreate = async (req, res) => {
    try {
        let data = req.body.data || "";

        if (!!data) {
            let response = await createTablesConfig(data);

            if (response) {
                return res.status(200).json({});
            } else {
                return res.status(500);
            }
        } else {
            return res.status(500);
        }
    } catch (e) {
        if (e) {
            return res.status(500);
        }
    }
}

const companyTablesConfigUpdate = async (req, res) => {
    try {
        let data = req.body.data || "";

        if (!!data) {
            let response = await updateTableConfig(data)
                .then((result) => {
                    res.status(200).json({});
                })
                .catch((error) => {
                    if (error) {
                        return res.status(500);
                    }
                });

            return response
        } else {
            return res.status(500);
        }
    } catch (e) {
        if (e) {
            return res.status(500);
        }
    }
};

const companyTablesConfigDelete = async (req, res) => {
    try {
        let data = req.body.data || "";

        if (!!data) {
            let response = await deleteTableConfig(data)
                .then((result) => {
                    res.status(200).json({});
                })
                .catch((error) => {
                    if (error) {
                        return res.status(500);
                    }
                });

            return response
        } else {
            return res.status(500);
        }
    } catch (e) {
        if (e) {
            return res.status(500);
        }
    }
};

const companyPreloginCreate = async (req, res) => {
    try {
        let data = req.body.data || "";

        if (!!data) {
            let response = await createPrelogin(data);

            if (response) {
                return res.status(200).json({});
            } else {
                return res.status(500);
            }
        } else {
            return res.status(500);
        }
    } catch (e) {
        if (e) {
            return res.status(500);
        }
    }
};

const companyPreloginDelete = async (req, res) => {
    try {
        let data = req.body.data || "";

        if (!!data) {
            let response = await deletePrelogin(data)
                .then((result) => {
                    res.status(200).json({});
                })
                .catch((error) => {
                    if (error) {
                        return res.status(500);
                    }
                });

            return response
        } else {
            return res.status(500);
        }
    } catch (e) {
        if (e) {
            return res.status(500);
        }
    }
};

module.exports = {
    dashboardUse,
    dashboardAccess,
    companyTablesCreate,
    companyTablesConfigUpdate,
    companyTablesConfigDelete,
    companyPreloginCreate,
    companyPreloginDelete
};
