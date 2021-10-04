
module.exports = {
    Name: 'crlcoin_helpers',
    Schema: {
        question: {
            type: String,
            require: true
        },
        answer: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
}