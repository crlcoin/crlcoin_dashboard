module.exports = {

    currentPage: (page, pageContent, navbar, options) => {
        let response = false

        if (isNaN(page) && isNaN(pageContent) && page == pageContent) {
            response = true
        }

        if (response && !!navbar && navbar === "true") {
            response = `javascript:void(0);`
        } else if (!!navbar && navbar === "true") {
            response = `${pageContent.toLowerCase()}`
        }
        if (!!options && options.fn) {
            return options.fn({ response: response })
        }

        return false
    },

    isEqual: (...args) => {
        const handlebars = args[args.length - 1]
        let response = true

        args.pop()

        args.forEach((i) => {
            args.forEach((j) => {
                if (i !== j) {
                    response = false
                }
            })
            if (!response) return
        })

        return handlebars.fn({ response: response })
    },

    isEqualAndReturn: (...args) => {
        let result = args[args.length - 2]
        let response = true

        args.splice(args.length - 2, 2)

        args.forEach((i) => {
            args.forEach((j) => {
                if (i !== j) {
                    response = false
                }
            })
            if (!response) return
        })

        return result = response ? result : ""
    },

    formatDate: (...args) => {
        args.splice(args.length - 1, 1)

        let date = args[0].toString().split(" ")
        let { [1]: Month, [2]: Day, [3]: Year } = date
        let response = `${Month} ${Day}, ${Year}`

        return response ? response : ""
    }

}