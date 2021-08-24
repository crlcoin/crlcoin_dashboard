
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
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
}