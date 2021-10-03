
const managerTablesDatas = require('../../model/Manager/registerModelCompanyReadTablesDatas')

const requireTablesDatas = async (id) => {
    try {

        return await managerTablesDatas.findOne({
                companyId: id
            })
            .select('_id tableId companyId tableConfig tableData')
            .then((response) => {

                if (!response)
                    return false

                response.tableConfig = filterTableData(response.tableConfig)

                return response

            })
            .catch((err) => {
                if (err)
                    console.log(err)

                return false
            })

    } catch (error) {
        if (error)
            console.log(error)
        return false
    }
}

const filterTableData = (data) => {

    delete data.table_id
    delete data.functions
    data.columns = data.columns.map(({name, type}) => {
        return {
            name: name,
            type: type
        }
    })

    return data

}

module.exports = {
    requireTablesDatas
}