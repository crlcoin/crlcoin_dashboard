const modelMessage = require("../model/Admin/registerModelMessages");

const {
    checkExistence
} = require('./adminLogins')

const messageCreate = async (data) => {
  try {

        data.isCompany = await checkExistence(data.email)

        let response = await modelMessage
            .create(data)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                if (error) {
                    throw "Controllers Error Messages 001";
                }
            });

        return response;
    } catch (e) {
        if (e) {
            return false;
        }
    }
}

const requireMessages = async (data) => {
  try {
        let response = await modelMessage
            .find({})
            .sort('-createdAt')
            .lean()
            .then((result) => {
                return result;
            })
            .catch((error) => {
                if (error) {
                    return false
                }
            })

        return response;
    } catch (e) {
        if (e) {
            return false
        }
    }
}

const messageDelete = async (messages) =>{
    try {

        if ( !Array.isArray(messages) ) messages = [messages]

        let response = await modelMessage
            .deleteMany({
                _id: messages
            }, (error) => {
                if (error) return false
                return true
            })

        return response
    } catch (error) {
        if (e) {
            return false
        }
    }
}

const messageUpdate = async (reference) =>{
    try {

        let response = await modelMessage
            .findOneAndUpdate({
                _id: reference
            }, {
                status: "opened"
            }, (error) => {
                if (error) return false
                return true
            })

        return response
    } catch (error) {
        if (e) {
            return false
        }
    }
}

module.exports = {
    messageCreate,
    requireMessages,
    messageDelete,
    messageUpdate
}