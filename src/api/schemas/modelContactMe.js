
module.exports = {
    Name: 'contact_me_messages',
    Schema: {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        subject: {
            type: String,
            require: true
        },
        message: {
            type: String,
            require: true
        },
        phone_number: {
            type: String
        },
        status: {
            type: String,
            require: true,
            default: "created"
        },
        isCompany: {
            type: Boolean,
            require: true,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
}