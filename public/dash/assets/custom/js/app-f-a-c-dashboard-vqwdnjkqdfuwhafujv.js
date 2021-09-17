
let deleteAllPermissionSelected = {

    result: [],

    subscribe(fn) {
        this.result.push(fn)
    },
    unsubscribe(fn) {
        this.result = this.result
        .filter(function(subscriber) {
            if (subscriber !== fn)
                return subscriber
        });
    },
    getAll() {
        return this.result
    }
}

let deleteAllRegisterSelected = {

    result: [],

    subscribe(fn) {
        this.result.push(fn)
    },
    unsubscribe(fn) {
        this.result = this.result
        .filter(function(subscriber) {
            if (subscriber !== fn)
                return subscriber
        });
    },
    getAll() {
        return this.result
    }
}

let deleteAllMessageSelected = {

    result: [],

    subscribe(fn) {
        this.result.push(fn)
    },
    unsubscribe(fn) {
        this.result = this.result
        .filter(function(subscriber) {
            if (subscriber !== fn)
                return subscriber
        });
    },
    getAll() {
        return this.result
    }
}

const appDashboardClickFunctions = {

    // Tables
    refreshCreateTable: function(element) {

        if (!!element && element.getAttribute('data-crl-edit') && !!location) {
            Swal.fire({
                title: "Are you sure?",
                text: "All columns will be reset!",
                type: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#dd3333"
            }).then(function (t) {
                if (t.value && !t.dismiss) {
                    location.reload()
                }
            });
            return
        }

        const getFormNewTable = document.getElementById('formNewTable')
        const getAllColumnsForm = document.querySelectorAll('[data-crl=column-form]')
        const getColumnTableName = document.getElementById('coluns-table-name')

        getColumnTableName.innerText = ""
        getAllColumnsForm.forEach(function(element, index) {
            if (index > 0) {
                element.remove()
            } else {
                element.querySelector('.columnOptionsPreview').innerText = ""
                element.querySelector('[data-crl=columnOptions]').classList.remove('pre-show')
                element.querySelector('[data-crl=columnFunction]').classList.remove('pre-show')
            }
        })
        getFormNewTable.reset()
        notification({message: "Reset table form"}, "success-2")

        return
    },

    removeColumn: function(column) {
        const getAllColumnsForm = document.querySelectorAll('[data-crl=column-form]')

        if (getAllColumnsForm.length > 1) {
            column.parentNode.parentNode.remove()
        } else {
            notification(helpers.errors.removeColumn, "info")
        }

        return
    },

    newColumn: function() {
        const getColunsAchor = document.querySelector('[data-crl=table-columns-anchor]')
        const getElementAndClone = document.querySelector('[data-crl=column-form]').cloneNode(true)

        getElementAndClone.querySelectorAll('input').forEach(function(element) {
            element.value = ""
        })
        getElementAndClone.querySelectorAll('textarea').forEach(function(element) {
            element.value = ""
        })
        getElementAndClone.querySelector('.columnOptionsPreview').innerText = ""
        getElementAndClone.querySelector('[data-crl=columnOptions]').classList.remove('pre-show')
        getElementAndClone.querySelector('[data-crl=columnFunction]').classList.remove('pre-show')

        getElementAndClone.querySelector('[data-crl=removeColumn]').addEventListener("click", function() {
            appDashboardClickFunctions.removeColumn(this)
        })
        appDashboardInputFunctions.columnOptionsList(getElementAndClone.querySelector('[data-crl=columnOptionsList]'))
        appDashboardInputFunctions.columnOptions(getElementAndClone.querySelector('#columnOptions'))

        getColunsAchor.appendChild(getElementAndClone)

        return
    },

    // Companies
    refreshCreateCompany: function() {
        const getFormNewCompany = document.getElementById('formNewCompany')

        getFormNewCompany.reset()
        notification({message: "Reset company permission form"}, "success-2")

        return
    },

    generatePermission: function(element) {
        const permissionInput = element.parentNode.querySelector('#companyPermission')

        let values = helpers.randomValues;
        let maxLength = values.length + Math.floor(Math.random() * 7);
        let randomValue = "";

        for (let i = 0;i < maxLength;i++) {
            randomValue += values[Math.floor(Math.random() * values.length)]
        }

        permissionInput.value = `@crlcoin+${randomValue}+${Date.now()}`

        if ( permissionInput.value.includes('undefined') ) {
            permissionInput.value.replace(/undefined/gi, '')
        }

        return
    },

    copyLinkPermission: function(element) {

        function copy() {
            let textArea = document.createElement('textarea')
                textArea.value = `//localhost:3000/auth/register${element.getAttribute('value')}`

            // Avoid scrolling to bottom
            textArea.style.top = "0"
            textArea.style.left = "0"
            textArea.style.position = "fixed"

            element.after(textArea)
            textArea.focus()
            textArea.select()

            try {
                let successful = document.execCommand('copy')
                let message = successful ? 'successful' : 'unsuccessful'

                if (message === "successful") {
                    notification({title: "Copy", message: "Copy to clipboard successful!"}, "success")
                } else {
                    notification({title: "Copy", message: "Could not copy text!"}, "error")
                }
            } catch (e) {
                notification({title: "Copy", message: "Oops, unable to copy"}, "error")
            }

            textArea.remove()
        }

        if (!navigator.clipboard) {
            copy()
            return
        }

        navigator.clipboard.writeText(element.getAttribute('value'))
            .then(function() {
                notification({title: "Copy", message: 'Copy to clipboard successful!'}, "success")
            }, function(err) {
                notification({title: "Copy", message: 'Could not copy text'}, "error")
            });

        return
    },

    actionSelectbox: function(element) {
        const attributeValue = element.getAttribute('value')

        if (attributeValue.includes('@crlcoin')) {
            element.checked
                ? deleteAllPermissionSelected.subscribe(attributeValue)
                : deleteAllPermissionSelected.unsubscribe(attributeValue)
        } else if (attributeValue.includes('@message-')) {
            let value = attributeValue.replace('@message-', '')
            element.checked
                ? deleteAllMessageSelected.subscribe(value)
                : deleteAllMessageSelected.unsubscribe(value)
        } else {
            element.checked
                ? deleteAllRegisterSelected.subscribe(attributeValue)
                : deleteAllRegisterSelected.unsubscribe(attributeValue)
        }

        return
    }

}

const appDashboardInputFunctions = {

    // Tables
    tableName: function() {
        const getInputName = document.getElementById('tableName')
        const getColumnTableName = document.getElementById('coluns-table-name')

        getInputName.addEventListener('input', function() {
            getColumnTableName.innerText = this.value
        })

        return
    },

    columnOptionsList: function(element) {
        let options = element.parentNode.parentNode.querySelector('[data-crl=columnOptions]')
        let functions = element.parentNode.parentNode.querySelector('[data-crl=columnFunction]')

        element.addEventListener('input', function() {
            if (!!this.value && this.value === "options") {
                options.classList.add("pre-show")
                functions.classList.remove("pre-show")
            } else if (!!this.value && this.value === "function") {
                options.classList.remove("pre-show")
                functions.classList.add("pre-show")
            } else if (this.value !== "function" && this.value !== "options") {
                options.classList.remove("pre-show")
                functions.classList.remove("pre-show")
            }
        })

        return
    },

    columnOptions: function(element) {
        let anchor = element.parentNode.querySelector('.columnOptionsPreview')

        element.addEventListener('input', function() {
            createColumnOptions(element, anchor)
        })
        element.addEventListener('change', function() {
            createColumnOptions(element, anchor)
        })
    },

    inputFindCompany: function(element) {
        let term
        element.addEventListener('input', function() {
            term = element.value.toLowerCase()
            let filterType = element.getAttribute('filter-type')

            document.querySelectorAll(`[filter-type=${filterType}]`).forEach(function(item, index) {
                if (!index) return
                let itemAttribute = item.getAttribute('data-crl-filters').toLowerCase()
                if (!!itemAttribute.includes(term)) {
                    item.style.display = "block"
                } else {
                    item.style.display = "none"
                }
            })
        });
    },

    helperTitle: function(element) {
        let reference = element.getAttribute('data-reference')
        let inputReference = document.querySelector(`[data-input-reference=${reference}]`)
        let submitButton = document.querySelector(`[data-submit-reference=${reference.replace('title', 'response')}]`)
        element.addEventListener('input', function() {
            inputReference.value = element.innerText
            submitButton.removeAttribute('disabled')
        })
    },

    helperResponse: function(element) {
        let reference = element.getAttribute('data-reference')
        let inputReference = document.querySelector(`[data-input-reference=${reference}]`)
        let submitButton = document.querySelector(`[data-submit-reference=${reference}]`)
        element.addEventListener('input', function() {
            inputReference.value = element.innerText
            submitButton.removeAttribute('disabled')
        })
    }

}

function createColumnOptions(element, anchor) {
    let matches = { " ; ": ";", "; ": ";", " ;": ";", ";;": ";", " , ": ";", ", ": ";", " ,": ";", ",,": ";", ",": ";", "  ": " " }

    let listValues = element.value || ""
    listValues = listValues.replace(/ ; |; | ;|;;| , |, | ,|,,|,|  /g, function(match) { return matches[match] });
    element.value = listValues
    listValues = listValues.split(";")
    listValues = listValues.filter(function(response) {
        if (response !== "")
            return response
    })

    if (Array.isArray(listValues) && listValues.length > 0) {
        anchor.innerText = ""
        listValues.forEach(function(value) {

            let newElementButton = document.createElement('button')
                newElementButton.type = 'button'
                newElementButton.value = value
                newElementButton.innerText = value
                newElementButton.className = 'btn btn-success waves-effect waves-light m-1'

            let newElementSupport = document.createElement('span')
                newElementSupport.className = 'btn-label-right'
                newElementSupport.innerHTML = '<i class="mdi mdi-check-all"></i>'

            newElementButton.appendChild(newElementSupport)
            anchor.appendChild(newElementButton)

        })
    }

    return
}

!(function(allCrlElements){

    allCrlElements.forEach(function(element) {
        const fn = element.getAttribute('data-crl')
        if (!!appDashboardInputFunctions[fn]) {
            appDashboardInputFunctions[fn](element)
        }
        if (!!appDashboardClickFunctions[fn]) {
            element.addEventListener('click', function() {
                appDashboardClickFunctions[fn](element)
            })
        }
    })

})(document.querySelectorAll('[data-crl]'))