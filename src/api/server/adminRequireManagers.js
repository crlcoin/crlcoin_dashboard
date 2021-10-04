const adminModelCompanies = require("../model/Admin/registerModelCompanyLogin")

const {
    permissionCaracterListSimple
} = require('../../constants')

const requireManagers = async () => {

    try {

        return await adminModelCompanies
            .find({})
            .lean()
            .then((result) => {
                result = result.filter(company => company.type !== 'account')
                return result
            })
            .catch((error) => {
                if (error) {
                    return false
                }
            })

    } catch (error) {
        if (error) {
            return "Require Company Error"
        }
    }

}

const clearSearchData = (data) => {
    let result = ""
    result = data.replace(permissionCaracterListSimple, "")
    return result
}

module.exports = {
    requireManagers
}