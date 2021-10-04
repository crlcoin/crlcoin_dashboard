
module.exports = {
    Name: "crlcoin_companies_prelogins",
    Schema: {
        permission: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            unique: true,
            require: true
        },
        type: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
}