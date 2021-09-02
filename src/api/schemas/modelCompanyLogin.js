
module.exports = {
    Name: "crlcoin_companies_logins",
    Schema: {
        app_id: {
            type: String,
            unique: true,
            require: true
        },
        companyName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        mpassword: {
            type: String,
            require: true
        },
        type: {
            type: String,
            require: true
        },
        phone_number: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
}