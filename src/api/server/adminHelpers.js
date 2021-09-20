const adminModelHelpers = require("../model/Admin/registerModelHelpers")

const registerNewHelper = async (data) => {
    try {

        data = newObject(data)

        return await adminModelHelpers
            .create(data)
            .then((result) => {
                return true;
            })
            .catch((error) => {
                if (error) {
                    return false
                }
            });

    } catch (e) {
        if (e) {
            console.log(e)
            return false
        }
    }
}

const deleteHelper = async (id) => {
    try {

        let response = await adminModelHelpers
            .deleteOne({
                _id: id.data
            }, (error) => {
                if (error) return false
                return true
            })

        return response
    } catch (e) {
        if (e) {
            return false
        }
    }
}

const updateHelper = async (data) =>{
    try {

        let reference = data.reference

        data = newObject(data)

        let response = await adminModelHelpers
            .findOneAndUpdate({
                _id: reference
            }, data, (error) => {
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

const requireHelpers = async () =>{
    try {

        let response = await adminModelHelpers
            .find({})
            .lean()
            .then((response) => {
                return response
            })
            .catch((err) => {
                if (err) {
                    return false
                }
            })

        return response
    } catch (error) {
        if (e) {
            return false
        }
    }
}

const newObject = (data) => {
    return {
        question: data.question,
        answer: data.response
    }
}

module.exports = {
    registerNewHelper,
    requireHelpers,
    updateHelper,
    deleteHelper
}