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

const {
    companyLoginCreate
} = require("../server/adminLogin");

const {
    messageCreate
} = require("../server/adminMessages");

const saveMessageData = async (req, res) => {

    if (!!req.messageData) {
        await messageCreate(req.messageData)
        return res.status(201).json({ message: "Message send!" })
    }

    return res.status(500).json({})
}

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
                    return res.status(200).json({});
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
                    return res.status(200).json({});
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
                    return res.status(200).json({});
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

const companyRegisterAccess = async (req, res) => {
    try {
        if (req.permission) {
            return res.render('templates/authentication/register', {permission: req.permission})
        }
        return res.redirect('/error/404')
    } catch (error) {
        return res.redirect('/error/500')
    }
}

const companyCreateLogin = async (req, res) => {
    try {

        if (!req.permission) {
            if (!!req.responseMessage) {
                return res.render('templates/authentication/register', {
                    permission: req.responsePermission || "",
                    message: {
                        boo: false,
                        message: req.responseMessage
                    }
                })
            }
            return res.render('templates/authentication/register', {
                permission: req.responsePermission || "",
                message: {
                    boo: false,
                    message: 'Unidentified Registration Error'
                }
            })
        }

        let data = req.body || "";

        data.type = res.responseType || "manager"

        console.log("DATA ::: ", data)

        if (!!data) {
            let response = await companyLoginCreate(data)
                .then((result) => {
                    return res.render('templates/authentication/register', {
                        message: {
                            boo: true,
                            message: `${response.name} created successfully!`
                        }
                    })
                })
                .catch((error) => {
                    if (error) {
                        return res.redirect('/error/500');
                    }
                });

            return response
        } else {
            return res.redirect('/error/500');
        }
    } catch (e) {
        if (e) {
            return res.redirect('/error/500');
        }
    }
};

module.exports = {
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
};