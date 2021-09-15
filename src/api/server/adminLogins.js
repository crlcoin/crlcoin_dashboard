const adminModelLogin = require("../model/Admin/registerModelCompanyLogin")

const {
    deletePrelogin
} = require('./adminPrelogin')

const {
    permissionCaracterListSimple
} = require('../../constants')

const checkExistence = async (data) => {
    try {
        return await adminModelLogin
            .countDocuments({
                email: data
            }, (err, count) => {
                if (count > 0) {
                    return true
                }
                return false
            })
    } catch (error) {
        if (e) {
            return {status: false, message: "Error ::: Register Company"}
        }
    }
}

const registerNewCompany = async (data) => {
    try {

        let permissionReference = data.permission

        data = newObject(data)

        return await adminModelLogin
            .create(data)
            .then((result) => {
                deletePrelogin(permissionReference)
                return {status: true, companyName: result.name};
            })
            .catch((error) => {
                if (error) {
                    return {status: false, message: "Error :: Register Company"}
                }
            });

    } catch (e) {
        if (e) {
            return {status: false, message: "Error ::: Register Company"}
        }
    }
}

const deleteCompany = async (app_id) => {
    try {

        if ( !Array.isArray(app_id) ) app_id = [app_id]

        let response = await adminModelLogin
            .deleteMany({
                app_id: app_id
            }, (error) => {
                if (error) return false
                return true
            })

        return response
    } catch (e) {
        if (e) {
            return false
        }
    }
}

const appRandomIdGenerator = (name) => {
    let result = ""
    result = name.replace(permissionCaracterListSimple, "")
    result += Date.now()
    return result
}

const appCheckPassward = (password, confirmPassword) => {
    let result = ""
    result = password === confirmPassword ? password : ""
    return result
}

const newObject = (data) => {

    return {
        app_id: appRandomIdGenerator(data.name),
        name: data.name,
        email: data.emailaddress,
        password: appCheckPassward(data.newPassword, data.confirmNewPassword),
        type: data.type
    }

}

module.exports = {
    checkExistence,
    registerNewCompany,
    deleteCompany
}