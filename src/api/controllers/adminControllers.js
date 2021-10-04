
const {
    requireOneAccount
} = require("../server/manager/managerAccount");

const {
    PrincipalULR,
    PagesList,
    ActionsList,
} = require('../../constants')

const {
    createTablesConfig,
    deleteTableConfig,
    requireTablesConfig,
    updateTableConfig,

    requireTablesDatas,
    createTablesDatas,
    updateTablesDatas
} = require('../server/adminTables');

const {
  createPrelogin,
  deletePrelogin,
} = require("../server/adminPrelogin");

const {
    registerNewCompany,
    deleteCompany
} = require("../server/adminLogins");

const {
    messageCreate,
    messageDelete,
    messageUpdate
} = require("../server/adminMessages");

const {
    registerNewHelper,
    updateHelper,
    deleteHelper
} = require('../server/adminHelpers')

const newHelper = async (req, res) => {

    if (!!req.body) {
        await registerNewHelper(req.body)
        return res.redirect('/f/a/c/dashboard/help')
    }

    return res.redirect('/error/500')
}

const updateHelp = async (req, res) => {

    if (!!req.body) {
        await updateHelper(req.body)
        return res.redirect('/f/a/c/dashboard/help')
    }

    return res.redirect('/error/500')
}

const deleteHelp = async (req, res) => {

    if (!!req.body) {
        await deleteHelper(req.body)
        return res.status(200).json({status: true})
    }

    return res.redirect('/error/500')
}

const saveMessageData = async (req, res) => {

    if (!!req.messageData) {
        await messageCreate(req.messageData)
        return res.status(201).json({ message: "Message send!" })
    }

    return res.status(500).json({})
}

const deleteMessage = async (req, res) => {

    let messages = req.body.data

    if (!!messages) {
        await messageDelete(messages)
        return res.status(200).json({ message: "Message Deleted" })
    }

    return res.status(500).json({})
}

const updateMessageStatus = async (req, res) => {

    let reference = req.body.data

    if (!!reference) {
        return await messageUpdate(reference)
            .then((response) => {
                return res.status(200).json({status: response ? true : false})
            })
            .catch((err) => {
                if (err) {
                    return res.status(500).json({})
                }
            })
    }

    return res.status(500).json({})
}

const dashboardUse = async (req, res) => {
    let template = ""
    let id = req.query.id || ""
    let table_id = req.query.refLink || ""
    let page = req.params.page || ""
    let _id = req.query.app_id || ""
    let companyTableDatas
    let tableData
    let reference

    if (!!id && ActionsList.includes(id) && !!table_id) {

        if (!!page) {
            PagesList.forEach(page => {
                if (page.toLowerCase() === req.params.page) {
                    template = id + page
                }
            })
        }

        if (!!_id) {
            companyTableDatas = await requireTablesDatas(table_id, _id)
        }

        if (!!template) {
            let response

            if (!!companyTableDatas && !!companyTableDatas.tableConfig) {
                reference = companyTableDatas._id
                response = companyTableDatas.tableConfig
                tableData = companyTableDatas.tableData
            } else {
                response = await requireTablesConfig(table_id);
            }

            return res.render('templates/dashboard/admin', {
                page: {
                    [template]: true,
                    title: page.toUpperCase(),
                    URL: PrincipalULR
                },
                tableId: table_id,
                companyId: _id,
                tableConfig: response,
                tableReference: reference,
                companyTableData: tableData || ''
            })
        }

    }

    return res.redirect('/error/404')
}

const companyTablesDataCreate = async (req, res) => {
    const {r, c, config, data, charts} = req.body
    let response = ''

    if (!!r && !!c, !!config && !!data && !!charts)
        response = await createTablesDatas({tableId: r, companyId: c, tableConfig: config, tableData: data, chartsData: charts})

    if (!!response)
        return res.status(201).json({status: true, message: "Table Data Saved!"})
    return res.status(400).json({status: false, message: "Error"})
}

const companyTablesDataUpdate = async (req, res) => {
    const {ref, r, c, config, data, charts} = req.body
    let response = ''

    if (!!ref, !!r && !!c, !!config && !!data && !!charts)
        response = await updateTablesDatas(ref, {tableId: r, companyId: c, tableConfig: config, tableData: data, chartsData: charts})

    if (!!response)
        return res.status(201).json({status: true, message: "Table Data Saved!"})
    return res.status(400).json({status: false, message: "Error"})
}

const dashboardAccess = async (req, res) => {
    let template = ""
    let manager

    if (!!req.params.page) {
        PagesList.forEach(page => {
            if (page.toLowerCase() === req.params.page) {
                template = page
            }
        })
    }

    manager = await requireOneAccount(req.session.credential.public_id)

    if (!!template) {
        return res.render('templates/dashboard/admin', {
            page: {
                [template]: true,
                title: template,
                URL: PrincipalULR
            },
            company: manager || '',
            preloginData: req.preloginData,
            companiesData: req.companies,
            simpleCompaniesData: req.simpleCompaniesData,
            tablesConfig: req.tablesConfig,
            contactMeMessages: req.contactMe,
            helpers: req.helpers
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
            return await createPrelogin(data)
                .then((result) => {

                    if (result) {
                        return res.status(201).json({});
                    } else {
                        return res.status(500).json({})
                    }

                })
                .catch((err) => {
                    return res.status(500);
                })

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

        if (!!data) {
            let response = await registerNewCompany(data)
                .then((response) => {
                    if (response.status) {
                        return res.render('templates/authentication/register', {
                            message: {
                                boo: true,
                                message: `${response.companyName} created successfully!`
                            }
                        })
                    } else {
                        return res.render('templates/authentication/register', {
                            message: {
                                boo: false,
                                message: `${response.message}`
                            }
                        })
                    }
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
}

const companyDeleteLogin = async (req, res) => {
    try {
        let data = req.body.data || "";

        if (!!data) {
            let response = await deleteCompany(data)
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
    } catch (error) {
        return res.redirect('/error/500')
    }
}

module.exports = {
    saveMessageData,
    deleteMessage,
    updateMessageStatus,

    dashboardUse,
    dashboardAccess,

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
};