const adminModelLogin = require("../model/Admin/registerModelCompanyLogin")

const companyLoginCreate = async (data) => {
    try {

        console.log( data )
        return true
        let response = await adminModelLogin
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

module.exports = {
    companyLoginCreate
}