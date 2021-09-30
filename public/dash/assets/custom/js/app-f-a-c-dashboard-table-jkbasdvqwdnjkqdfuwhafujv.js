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

    // number(element) {
    //     element.addEventListener('input', function(event) {
            // let value = element.innerText
            // let check = value.replace(/[^a-dA-DEf-zF-Z]/g, '')

            // if (!!check) {
            //     element.style.backgroundColor = '#ff0f39'
            //     element.style.color = '#f8f8f8'
            //     element.setAttribute('title', `Inválido: ${check.split('')}`)
            // } else {
            //     element.style.backgroundColor = 'initial'
            //     element.style.color = 'initial'
            //     element.removeAttribute('title')
            // }

            // element.innerText = element.innerText

    //     })
    // },

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

function columnFunctions(element){
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

function saveRowData(row) {
    console.log(row)
    return
}

window.addEventListener('load', function() {
    let table = document.getElementById('table-company-data')
    table.addEventListener('input', function() {
        execScriptTable(table.getAttribute('data-function'))
    })

    document.querySelector('[data-table=new-row]').addEventListener('click', function() {

        let tableBody = table.querySelector('tbody')
        let getTableRowReference = document.querySelector('[data-table-row=table-row-base').cloneNode(true)
        let saveButton = getTableRowReference.querySelector('[data-table=save-row]')
        let deleteButton = getTableRowReference.querySelector('[data-table=delete-row]')
        let row = saveButton.parentNode.parentNode

        getTableRowReference.setAttribute( 'data-table-row', 'table-row-input')
        saveButton.addEventListener('click', function() {
            saveRowData(row)
        })
        deleteButton.addEventListener('click', function() {
            getTableRowReference.remove()
            setRowDataId(tableBody.querySelectorAll('tr'))
        })

        tableBody.appendChild( getTableRowReference )

        addRowFunctions(row, {saveButton: saveButton})
        setRowDataId(tableBody.querySelectorAll('tr'))

        columnFunctions(getTableRowReference)
    })

})