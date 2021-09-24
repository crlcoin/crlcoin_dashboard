const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const mailer = require('../../modules/mailer')
const adminModelLogin = require("../model/Admin/registerModelCompanyLogin")

const {
    deletePrelogin
} = require('./adminPrelogin')

const constants = require('../../constants')

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

        if (!!user && appCheckPasswordHash(data.password, user.password)) {

            return filterLoginData(user)

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

const resetPassword = async (data) => {
    try {

        const user = await adminModelLogin.findOne({email: data})

        if (!user)
            return false

        const token = crypto.randomBytes(21).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)

        await adminModelLogin.findByIdAndUpdate(user._id, {
            '$set': {
                resetCode: token,
                codeExpire: now
            }
        })

        mailer.sendMail({
            to: user.email,
            from: 'no-reply@crlcoin.com.br',
            subject: 'Reset Password',
            template: 'recoverpass',
            context: { token }
        }, (err) => {
            if (err) {
                return false
            }

            return true
        })

    } catch (error) {
        if (error)
            return false
    }
}

const appRandomIdGenerator = (name) => {
    let result = ""
    result = name.replace(constants.permissionCaracterListSimple, "")
    result += Date.now()
    return result
}

const appCheckPasswordHash = (pass, hash) => {
    try {
        if (!!pass && pass.length > 7) {

            return bcrypt.compareSync(pass, hash)

        } else {
            return false
        }
    } catch (error) {
        if (error)
            return false
    }
}

const appCheckPassword = (password, confirmPassword) => {
    try {
        if (password === confirmPassword && password.length > 7) {

            return bcrypt.hashSync(password, 14)

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
        password: appCheckPassword(data.newPassword, data.confirmNewPassword),
        type: await appCheckAccountType(data.emailaddress)
    }

}

const filterLoginData = (data) => {
    let { type, app_id } = data

    type = constants[type] || 'err'

    return { type: type, public_id: app_id }
}

module.exports = {
    checkExistence,
    registerNewCompany,
    deleteCompany,
    accessAccount,
    resetPassword
}