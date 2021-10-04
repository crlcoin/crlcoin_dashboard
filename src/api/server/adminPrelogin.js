const adminModelCompanyPrelogin = require("../model/Admin/registerModelCompanyPrelogin");

const createPrelogin = async (data) => {
  try {
        return await adminModelCompanyPrelogin
            .create(data)
            .then((result) => {
                return true
            })
            .catch((error) => {
                if (error) {
                    return false
                }
            })

    } catch (e) {
        if (e) {
            return false;
        }
    }
};

const requirePrelogin = async (permission) => {
    try {

        if (!!permission) {

            return await adminModelCompanyPrelogin
                .findOne({
                    permission: permission
                })
                .lean()
                .then((result) => {
                    return result
                })
                .catch((error) => {
                    if (error) {
                        return false
                    }
                })

        }

        return await adminModelCompanyPrelogin
            .find({})
            .sort('-createdAt')
            .lean()
            .then((result) => {
                return result;
            })
            .catch((error) => {
                if (error) {
                    return ""
                }
            });

    } catch (e) {
        if (e) {
            return false;
        }
    }
};

const deletePrelogin = async (permission) => {
    try {

        if ( !Array.isArray(permission) ) permission = [permission]

        let response = await adminModelCompanyPrelogin
            .deleteMany({
                permission: permission
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
    createPrelogin,
    requirePrelogin,
    deletePrelogin,
};