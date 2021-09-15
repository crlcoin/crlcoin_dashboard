
!(function () {
    let getPassInput = document.getElementById('password')
    let getConfirmPassInput = document.getElementById('cpassword')
    let getButtonSubmit = document.getElementById('button-submit')

    getPassInput.addEventListener('input', function () {
        let confirmPassValue = getConfirmPassInput.value
        let passValue = getPassInput.value
        let passLength = (getPassInput.value).length
        let getAlertMinDigits = document.getElementById('alert-min-digits')
        if (passLength > 7) {
            getAlertMinDigits.classList.remove('text-white')
            getAlertMinDigits.classList.remove('text-danger')
            getAlertMinDigits.classList.add('text-success')
        } else {
            getAlertMinDigits.classList.remove('text-white')
            getAlertMinDigits.classList.remove('text-success')
            getAlertMinDigits.classList.add('text-danger')
        }
        if (passValue.length > 7 && confirmPassValue === passValue) {
            getButtonSubmit.removeAttribute('disabled')
        } else {
            getButtonSubmit.setAttribute('disabled', true)
        }
    })

    getConfirmPassInput.addEventListener('input', function () {
        let confirmPassValue = getConfirmPassInput.value
        let passValue = getPassInput.value
        if (confirmPassValue.length > 7 && confirmPassValue === passValue) {
            getButtonSubmit.removeAttribute('disabled')
        } else {
            getButtonSubmit.setAttribute('disabled', true)
        }
    })
})()