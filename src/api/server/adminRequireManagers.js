const adminModelCompanies = require("../model/Admin/registerModelCompanyLogin")

const {
    permissionCaracterListSimple
} = require('../../constants')

const requireManagers = async (data) => {

    try {

        if (!data) {

            return await adminModelCompanies
                .find({})
                .lean()
                .then((result) => {
                    result = result.filter(companyData => removePassword(companyData))
                    return result
                })
                .catch((error) => {
                    if (error) {
                        return false
                    }
                })

        } else {

            data = clearSearchData(data)

            return await adminModelCompanies
                .find({})
                .lean()
                .then((result) => {
                    return result
                })
                .catach((error) => {
                    if (error) {
                        return false
                    }
                })

        }

    } catch (error) {
        if (error) {
            console.log(error)
            return "Require Company Error"
        }
    }

}

const removePassword = (data) => {
    delete data["password"]
    return data
}

const clearSearchData = (data) => {
    let result = ""
    result = data.replace(permissionCaracterListSimple, "")
    return result
}

module.exports = {
    requireManagers
}