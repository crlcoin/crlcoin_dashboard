
/*
 * Global utilities
 */
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    }
}

const elementBlock = function(element) {
    return element.style.display = 'block'
}

const elementFlex = function (element) {
    return element.style.display = 'flex'
}

const elementNone = function(element) {
    return element.style.display = 'none'
}

const modFunction = function(script, row) {
    return script.replace(/COL\(/g, `COL(${row},`)
}

/*
 * Comparison Functions
 */
const equalTo = function(value, compare, responseTrue, responseFalse) {
    return value === compare
        ? responseTrue
        : responseFalse
}

const notEqual = function(value, compare, responseTrue, responseFalse) {
    return value !== compare
        ? responseTrue
        : responseFalse
}

const greaterThan = function(value, compare, responseTrue, responseFalse) {
    return value > compare
        ? responseTrue
        : responseFalse
}

const lessThan = function(value, compare, responseTrue, responseFalse) {
    return value < compare
        ? responseTrue
        : responseFalse
}

const greaterThanOrEqualTo = function(value, compare, responseTrue, responseFalse) {
    return value >= compare
        ? responseTrue
        : responseFalse
}

const lessThanOrEqualTo = function(value, compare, responseTrue, responseFalse) {
    return value <= compare
        ? responseTrue
        : responseFalse
}

/*
 * Custom functions
 */
const COL = function(row, column) {
    let getRow = document.querySelectorAll('[data-table-row=table-row-input]')[row]
    let getColumn = getRow.querySelector(`[data-column="${column}"]`)
    return getColumn.innerText
}

const SE = function(compare, responseTrue, responseFalse) {
    return compare
        ? responseTrue
        : responseFalse
}

const FN = function(args) {
    if (args.includes("chart(")) {
        execScriptContainer(args)
    } else {

        let { [0]: req, [1]: res, [2]: done } = args

        document.querySelectorAll(`#table-company-data [data-column=${req.trim()}]`).forEach((require, relativeRow) => {

            let response = require.parentNode.querySelector(`[data-column=${res.trim()}]`)
            let value = require.innerText
            let newDone

            if (isNaN(value))
                value = JSON.stringify(value)
            else
                value = Number(value)

            if (!!value) {
                newDone = done.replace(/value/gi, `${value}`)
                execScriptContainer(newDone, response, relativeRow)
            } else {
                response.innerText = ''
            }

        })

    }

    return
}


/*
 * Chart functions
 */
let chartValue = {
    result: {},
    subscribe: function({key, data}) {
        this.result[key] = data
    },
    getAll: function() {
        return this.result
    }
}

const chart = function(column) {
    let columns = document.querySelectorAll(`#table-company-data [data-column="${column.trim()}"]`)
    let data = {}
    let list = []
    let keys
    columns.forEach(function(col) {
        if (!!data[col.innerText]) {
            data[col.innerText]++
        } else {
            data[col.innerText] = 1
        }
    })

    keys = Object.keys(data)

    keys.forEach(function(key) {
        list.push({
            label: key,
            value: ((data[key] * 100) / columns.length).toFixed(2)
        })
    })

    chartValue.subscribe({
        key: column,
        data: list
    })

    return
}

/*
 * Exec functions
 */
const execScriptTable = function (script) {
    let FNs = script.split(';')

    FNs.forEach((fn) => {

        if (fn.includes("chart("))
            FN(fn)
        else if (!!fn)
            FN( fn.split(':') )

    })
    return
}

const execScriptContainer = function (script, response, relativeRow) {
    let check = !!response && !!relativeRow

    if (check)
        script = modFunction(script, relativeRow)

    let createScript = document.createElement('script')
        createScript.id = `id${Date.now()}`
        createScript.innerHTML = `document.getElementById('${createScript.id}').setAttribute('script-response', ${script})`
        document.body.appendChild(createScript)

    if (check)
        response.innerText = document.getElementById(`${createScript.id}`).getAttribute('script-response')

        createScript.remove()
    return
}