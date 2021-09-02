const adminModelTablesConfig = require("../model/Admin/registerModelTablesConfig");

const createTablesConfig = async (data) => {
    try {
        let response = await adminModelTablesConfig
            .create(data)
            .then((result) => {
                return result.name;
            })
            .catch((error) => {
                if (error) {
                    return error.message;
                }
            });

        return response;
    } catch (e) {
        if (e) {
            return false;
        }
    }
};

const requireTablesConfig = async (id) => {
    try {
        let search = {}
        if (!!id) {
            search.table_id = id
            return response = await adminModelTablesConfig
                .findOne(search)
                .lean()
                .then((result) => {
                    return result;
                })
                .catch((error) => {
                    if (error) {
                        return false;
                    }
                });
        }

        return response = await adminModelTablesConfig
            .find({})
            .sort("-usedBy")
            .lean()
            .then((result) => {
                return result;
            })
            .catch((error) => {
                if (error) {
                    return false;
                }
            });
    } catch (e) {
        if (e) {
            return false;
        }
    }
};

const updateTableConfig = async (data) => {
    try {
        table_id = ""

        if ( !!data.table_id ) table_id = data.table_id

        delete data.table_id

        let response = await adminModelTablesConfig
            .findOneAndUpdate({
                table_id: table_id
            }, data, (error) => {
                if (error) return false
                return true
            })

        return response;
    } catch (e) {
        if (e) {
            return false;
        }
    }
};

const deleteTableConfig = async (table_id) => {
    try {

        if ( !Array.isArray(table_id) ) table_id = [table_id]

        let response = await adminModelTablesConfig
            .deleteMany({
                table_id: table_id
            }, (error) => {
                if (error) return false
                return true
            })

        return response;
    } catch (e) {
        if (e) {
            return false;
        }
    }
};

module.exports = {
    createTablesConfig,
    requireTablesConfig,
    updateTableConfig,
    deleteTableConfig
};
