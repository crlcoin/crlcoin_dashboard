const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const mailer = require('../../modules/mailer')
const adminModelLogin = require("../model/Admin/registerModelCompanyLogin")

const {
    deletePrelogin
} = require('./adminPrelogin')

const constants = require('../../constants')

const {
    SITE_URL,
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

        return await adminModelLogin
            .findOne({
                email: data.email
            })
            .select('password app_id type')
            .then((result) => {
                if (result && appCheckPasswordHash(data.password, result.password)) {
                    delete result.password
                    result = filterLoginData(result)
                    return result
                } else {
                    return false
                }
            })
            .catch((error) => {
                return false
            })

    } catch (error) {
        if (error) {
            return false
        }
    }

}

const createNewPassword = async (data) => {

    try {

        let result = {
            status: false,
            message: ''
        }

        const {token, password, confirmpassword} = data

        if (!password || !confirmpassword) {
            result.message = 'Error: Password'
            return result
        }

        let hash = appCheckPassword(password, confirmpassword)

        if (!hash) {
            result.message = 'Error:: Password'
            return result
        }

        return await adminModelLogin
            .findOneAndUpdate({
                resetCode: token,
            }, {
                password: hash,
                resetCode: '',
                codeExpire: Date.now()
            })
            .then((response) => {
                result.status = true
                return result
            })
            .catch((err) => {
                result.message = 'Error: Server Error'
                return result
            })

    } catch (error) {
        if (error) {
            return {
                status: false,
                message: 'Error:: Server Error'
            }
        }
    }
}

const checkResetPasswordToken = async ({token}) => {
    try {

        const expireDate = await adminModelLogin
            .findOne({resetCode: token})
            .select('codeExpire')
            .then(({codeExpire}) => {
                return codeExpire
            })
            .catch((err) => {
                return false
            })

        if (!expireDate)
            return false

        if (expireDate > Date.now())
            return token

        return false

    } catch (error) {
        if (error)
            return false
    }
}

const resetPassword = async (data) => {
    try {

        const user = await adminModelLogin.findOne({email: data})

        if (!user)
            return false

        const token = crypto.randomBytes(28).toString('hex')

        const now = Date.now() + 900000

        await adminModelLogin.findByIdAndUpdate(user._id, {
            '$set': {
                resetCode: token,
                codeExpire: now
            }
        })
        .catch((err) => {
            if (err)
                console.log(err)
            return false
        })

        mailer.sendMail({
            to: user.email,
            from: 'no-reply@crlcoin.com.br',
            subject: 'Reset Password',
            template: 'recoverpass',
            context: { SITE_URL, token }
        }, (err) => {
            if (err) {
                console.log(err)
                return false
            }

            return true
        })

    } catch (error) {
        if (error)
            console.log(error)
            return false
    }
}

const updateAccountPassword = async (data) => {
    try {

        const { currentEmail, currentPassword, newPassword, confirmPassword } = data

        return await adminModelLogin
            .findOne({
                email: currentEmail
            })
            .select('_id password')
            .then(async (result) => {
                if (!result)
                    return false

                let check = appCheckPasswordHash(currentPassword, result.password)
                if (check) {
                    return await updateCurrentPassword(result._id, newPassword, confirmPassword)
                } else {
                    return false
                }
            })
            .catch((error) => {
                if (error)
                    console.log(error)
                return false
            })

    } catch (error) {
        if (error)
            console.log(error)
        return false
    }
}

const updateCurrentPassword = async (id, password, confirmpassword) => {
    try {

        let result = {
            status: false,
            message: ''
        }

        if (!password || !confirmpassword) {
            result.message = 'Error: Password'
            return result
        }

        let hash = appCheckPassword(password, confirmpassword)

        if (!hash) {
            result.message = 'Error:: Password'
            return result
        }

        return await adminModelLogin
            .findOneAndUpdate({
                _id: id,
            }, {
                password: hash
            })
            .then((response) => {
                if (!response)
                    return result

                result.status = true
                return result
            })
            .catch((err) => {
                result.message = 'Error: Server Error'
                return result
            })

    } catch (error) {
        if (error)
            console.log(error)
        return false
    }
}

const requireAllAccounts = async () => {
    try {

        let users = await adminModelLogin.find({})

        users = users.filter(({type}) => type === 'manager')

    } catch (error) {
        if (error)
            return console.log(error.message)
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
    let { type, _id } = data

    type = constants[type] || 'err'

    return { type: type, public_id: _id }
}

module.exports = {
    checkExistence,
    registerNewCompany,
    deleteCompany,
    accessAccount,
    resetPassword,
    requireAllAccounts,
    checkResetPasswordToken,
    createNewPassword,

    updateAccountPassword
}