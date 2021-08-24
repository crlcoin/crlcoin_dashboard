module.exports = {

    currentPage: (page, pageContent, navbar, options) => {
        let response = false
        if (isNaN(page) && isNaN(pageContent)) {
            if (page == pageContent) {
                response = true
            }
        }

        if (response && !!navbar && navbar === "true") {
            response = `javascript:void(0);`
        } else if (!!navbar && navbar === "true") {
            response = `/f/a/c/dashboard/${pageContent.toLowerCase()}`
        }
        if (!!options && options.fn)
            return options.fn({ response: response })

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
        /*
         * Pega o valor que será retornado
         * Remove o valor de retorno da lista de comparação
         * Remove a função passada pelo handlebars lista de comparação
         */
        let result = args[args.length-2]
            args.splice(args.length-2, 2)

        let response = true

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

    formatDate: (dateString, options) => {

        let date = Date(dateString).split(" ")
        let { [1]: Month, [2]: Day, [3]: Year } = date

        let newDateFormat = `${Month} ${Day}, ${Year}`

        return options.fn({ response: newDateFormat })
    }

}