
const adminModelLogin = require('../../model/Manager/registerModelCompanyReadLoginDatas')

const requireOneAccount = async (id) => {
    try {

        return await adminModelLogin
            .findById(id)
            .select('_id name email')
            .then((response) => {
                if (!response)
                    return false

                return filterLoginData(response)
            })
            .catch((err) => {
                if (err)
                    console.log(err)
                return false
            })

    } catch (error) {
        if (error)
            console.log("err:: ", error)
        return false
    }
}

const filterLoginData = (data) => {
    let { _id, name, email } = data

    let splitEmail = email.split('@')

    let firstPart = splitEmail[0]
    let secondPart = splitEmail[1].split('.')
    let finalPart = secondPart.slice(1)

    secondPart = secondPart[0]

    if (finalPart.length > 1)
        finalPart[0] = '***'

    finalPart = finalPart.join('.')

    let newEmail = `${firstPart[0] || ''}${firstPart[1] || ''}${firstPart[2] || ''}*****`
        newEmail += `@${secondPart[0] || ''}*****.${finalPart}`

    return { id: _id, name, email: newEmail }
}

module.exports = {
    requireOneAccount
}