
module.exports = {
    Name: "crlcoin_tables_datas",
    Schema: {
        app_id: {
            type: String,
            default: `i${Date.now()}`
        },
        companyId: {
            type: String,
            require: true
        },
        tableId: {
            type: String,
            require: true
        },
        tableConfig: {
            type: String,
            require: true
        },
        tableData: {
            type: Array,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
}