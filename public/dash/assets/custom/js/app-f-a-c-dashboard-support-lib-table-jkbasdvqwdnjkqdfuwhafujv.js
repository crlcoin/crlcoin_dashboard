
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
    return
}

// Exec functions
const execScriptTable = function (script) {
    let FNs = script.split(';')
    FNs.forEach((fn) => {

        if (!!fn) {
            FN( fn.split(':') )
        }

    })
    return
}

const execScriptContainer = function (script, response, relativeRow) {

    script = modFunction(script, relativeRow)

    let createScript = document.createElement('script')
        createScript.id = `id${Date.now()}`
        createScript.innerHTML = `document.getElementById('${createScript.id}').setAttribute('script-response', ${script})`
        document.body.appendChild(createScript)
        response.innerText = document.getElementById(`${createScript.id}`).getAttribute('script-response')
        createScript.remove()
    return
}