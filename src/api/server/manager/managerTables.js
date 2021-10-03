
const managerTablesDatas = require('../../model/Manager/registerModelCompanyReadTablesDatas')

const requireTablesDatas = async (_id) => {
    try {

        return await managerTablesDatas.findOne({
                companyId: _id
            })
            .then((response) => {

                console.log( "MANAGER TABLE DATA:: ", response )

                if (!response)
                    return false

                return response

            })

    } catch (error) {
        if (error)
            console.log(error)
    }
}

module.exports = {
    requireTablesDatas
}