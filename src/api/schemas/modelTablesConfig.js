
module.exports = {
    Name: "crlcoin_tables",
    Schema: {
        table_id: {
            type: String,
            unique: true,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        columns: {
            type: Array,
            require: true
        },
        functions: {
            type: String
        },
        usedBy: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
}