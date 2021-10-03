
const modelHelpers = require('../../model/Manager/registerModelHelpers')

const requireHelpers = async () => {
    try {

        return await modelHelpers
            .find({})
            .then((response) => {
                if (!response)
                    return false

                response = filterResponse(response)

                return response
            })
            .catch((err) => {
                if (err)
                    console.log(err)
                return false
            })

    } catch (error) {
        if (error)
            console.log("err:: ", error)
        return false
    }
}

const filterResponse = (res) => {
    let result = []
    res.forEach((r) => {
        result.push({
            reference: r._id,
            question: r.question,
            answer: r.answer,
            createdAt: r.createdAt
        })
    })
    return result
}

module.exports = {
    requireHelpers
}