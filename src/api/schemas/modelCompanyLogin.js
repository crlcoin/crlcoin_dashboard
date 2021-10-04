
module.exports = {
    Name: "crlcoin_companies_logins",
    Schema: {
        app_id: {
            type: String,
            unique: true,
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
        password: {
            type: String,
            require: true,
            select: false
        },
        type: {
            type: String,
            require: true,
            default: "manager"
        },
        resetCode: {
            type: String,
            select: false
        },
        codeExpire: {
            type: String,
            select: false
        },
        phone_number: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
}