function setRowDataId(rows) {
    rows.forEach((row, index) => {
        row.querySelector('[data-type=id]').innerText = index + 1
    })

    return
}

function createOptionsPoups(element, options) {

    let createPopup = document.createElement('div')
        createPopup.className = 'options-popup list-group bg-white rounded border shadow'
        createPopup.style.position = 'absolute'
        createPopup.style.top = `0`
        createPopup.style.zIndex = '1000'
        createPopup.style.display = 'none'

    let closeBtn = document.createElement('div')
        closeBtn.className = 'list-group-item bg-danger py-1 text-light text-center'
        closeBtn.style.cursor = 'pointer'
        closeBtn.innerHTML = '<i class="mdi mdi-close"></i>'
        closeBtn.addEventListener('click', function(){ elementNone(createPopup) })

    createPopup.appendChild(closeBtn)

    options.forEach((option) => {

        let li = document.createElement('div')
            li.className = 'list-group-item py-1'
            li.innerText = option
            li.style.cursor = 'pointer'

            li.addEventListener('click', function() {
                element.innerText = option
                elementNone(createPopup)
            })

        createPopup.appendChild(li)
    })

    element.addEventListener('focus', function() {
        if (createPopup.style.display === 'none')
            elementFlex(createPopup)
        else
            elementNone(createPopup)
    })

    element.after(createPopup)

    return
}

const setFunctions = {

    options(element) {
        let options = element.getAttribute('data-options').split(',')
        createOptionsPoups(element, options)
        return
    },

}

const setColumnStyle = {

    'action-button': function(column) {
        column.style.minWidth = '50px'
        column.style.maxWidth = '70px'
    },
    'function': function(column) {
        column.style.maxWidth = '420px'
    },
    'id': function(column) {
        column.style.maxWidth = '420px'
    },
    'link': function(column) {
        column.style.minWidth = 'auto'
        column.style.maxWidth = '420px'
    },
    'number': function(column) {
        column.style.maxWidth = '280px'
    },
    'options': function(column) {
        column.style.minWidth = '140px'
        column.style.maxWidth = '420px'
    },
    'percent': function(column) {
        column.style.minWidth = '140px'
    },
    'text': function(column) {
        column.style.minWidth = '140px'
        column.style.maxWidth = '420px'
    }

}

function columnFunctions(element, data){
    let getAllColumns = element.querySelectorAll('th')

    getAllColumns.forEach((column) => {
        let type = column.getAttribute('data-type')

        if (!!type && !!setColumnStyle[type])
            setColumnStyle[type](column)

        if (!!type && !!setFunctions[type])
            setFunctions[type](column)

        column.style.verticalAlign = 'middle'
    })

    return
}

function addRowFunctions(row, objt) {
    row.addEventListener('input', function() {
        objt.saveButton.removeAttribute('disabled')
    })
    return
}

function saveTableData(table) {
    let chartsData = chartValue.getAll()
    let chartsKeys = Object.keys(chartsData)
    let charts = []
    let config = table.getAttribute('data-table-config')
    let ref = table.getAttribute('data-table-data-ref')
    let rId = table.getAttribute('data-table-r')
    let cId = table.getAttribute('data-table-c')
    let rows = table.querySelectorAll('[data-table-row=table-row-input]')
    let tableData = []
    let objt = {}

    rows.forEach((row, index) => {
        let columns = row.querySelectorAll('[data-column]')
        columns.forEach((col) => {

            if (!!tableData[index])
                tableData[index].push(col.innerText)
            else
                tableData[index] = [col.innerText]

        })
    })

    if (!!ref)
        objt.ref = ref

    if ( !!chartsKeys && chartsKeys.length > 0) {
        chartsKeys.forEach(function(key) {
            charts.push(chartsData[key])
        })
    }

    objt.r = rId
    objt.c = cId
    objt.config = JSON.parse(config)
    objt.data = tableData
    objt.charts = charts

    return axiosSaveTableData( table.getAttribute('data-table-u'), objt )
}

function addRowData(row, data) {
    let columns = row.querySelectorAll('[data-column]')

    columns.forEach(function(el, index) {
        el.innerText = data[index]
    })

    return
}

function createNewRow(saveButton, table, data) {

    let tableBody = table.querySelector('tbody')
    let getTableRowReference = document.querySelector('[data-table-row=table-row-base').cloneNode(true)
    let deleteButton = getTableRowReference.querySelector('[data-table=delete-row]')

    getTableRowReference.setAttribute( 'data-table-row', 'table-row-input')
    deleteButton.addEventListener('click', function() {
        getTableRowReference.remove()
        setRowDataId(tableBody.querySelectorAll('tr'))
    })

    tableBody.appendChild( getTableRowReference )

    addRowFunctions(getTableRowReference, {saveButton})
    setRowDataId(tableBody.querySelectorAll('tr'))

    if (!!data)
        addRowData(getTableRowReference, data)

    columnFunctions(getTableRowReference)
}

window.addEventListener('load', function() {
    let dataExi = document.querySelector('[data-table-exi]')
    let saveButton = document.querySelector('[data-table=save-table-data]')
    let table = document.getElementById('table-company-data')

    saveButton.addEventListener('click', function() {
        saveTableData(table)
    })
    table.addEventListener('input', function() {
        execScriptTable(table.getAttribute('data-function'))
    })

    document.querySelector('[data-table=new-row]').addEventListener('click', function() {
        createNewRow(saveButton, table)
    })

    if (!!dataExi) {
        let data = dataExi.getAttribute('data-table-exi').split('{;}')

        data.forEach(function(e) {
            if (!!e)
                createNewRow(saveButton, table, e.split('{:}'))
        })

    }

})