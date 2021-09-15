const adminModelCompanyPrelogin = require("../model/Admin/registerModelCompanyPrelogin");

const createPrelogin = async (data) => {
  try {
        let response = await adminModelCompanyPrelogin
            .create(data)
            .then((result) => {
                return result.name;
            })
            .catch((error) => {
                if (error) {
                    throw "Controllers Error Company 001";
                }
            });

        return response;
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
                    console.log("Error: ", error.message)
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