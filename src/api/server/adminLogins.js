const bcrypt = require('bcryptjs')
const adminModelLogin = require("../model/Admin/registerModelCompanyLogin")

const {
    deletePrelogin
} = require('./adminPrelogin')

const {
    permissionCaracterListSimple
} = require('../../constants')

const {
    adminEmail
} = require('../../config')

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

        data = await newObject(data)

        if (data.type === 'register denied' || !data.password)
            return {status: false, message: "Register Denied : on Register"}

        return await adminModelLogin
            .create(data)
            .then((result) => {
                deletePrelogin(permissionReference)
                return {status: true, companyName: result.name};
            })
            .catch((error) => {
                if (error) {
                    console.log(error)
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

const accessAccount = async (data) => {
    try {

        let user = await adminModelLogin
            .findOne({
                email: data.email
            })
            .then((result) => {
                return result
            })
            .catch((error) => {
                return false
            })

        if (!!user && appCheckPasswardHash(data.password, user.password)) {

            

            return user

        } else {
            return false
        }

    } catch (error) {
        if (error) {
            console.log(error)
        }
        return false
    }

}

const updatePassword = async (data) => {
    try {
        
    } catch (error) {
        if (err) {
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

const appCheckPasswardHash = (pass, hash) => {
    try {
        if (!!pass && pass.length > 7) {

            const compare = bcrypt.compareSync(pass, hash)

            return compare

        } else {
            return false
        }
    } catch (error) {
        if (error)
            return false
    }
}

const appCheckPassward = (password, confirmPassword) => {
    try {
        if (password === confirmPassword && password.length > 7) {

            const hash = bcrypt.hashSync(password, 14)

            return hash

        } else {
            return false
        }
    } catch (error) {
        if (error)
            return false
    }
}

const appCheckAccountType = async (mail) => {
    let result = 'manager'
    if (mail === adminEmail) {
        return await adminModelLogin
            .countDocuments({
                type: 'account'
            })
            .then((response) => {
                if (response === 0)
                    return 'account'
                else
                    return 'register denied'
            })
            .catch((err) => {
                console.log(err, "ERR MAIL ADMIN RESULT")
                return result
            })
    } else {
        return result
    }
}

const newObject = async (data) => {

    return {
        app_id: appRandomIdGenerator(data.name),
        name: data.name,
        email: data.emailaddress,
        password: appCheckPassward(data.newPassword, data.confirmNewPassword),
        type: await appCheckAccountType(data.emailaddress)
    }

}

module.exports = {
    checkExistence,
    registerNewCompany,
    deleteCompany
}