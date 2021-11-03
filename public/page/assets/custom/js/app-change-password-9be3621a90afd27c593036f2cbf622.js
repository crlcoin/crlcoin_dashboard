const form = document.getElementById('changer-password')
const ref = document.getElementById('reference-data')
const currentEmail = document.getElementById('currentemail')
const currentPassword = document.getElementById('currentpassword')
const inputPassword = document.getElementById('newpassword')
const inputConfirmPassword = document.getElementById('confirmpassword')
const submit = document.getElementById('submit')
const errors = document.getElementById('error')

const messages = {
    "400": "Check your informations",
    "500": "Internal Server Error",
    currentemail: 'Enter current email',
    currentpass: 'Enter current password',
    length: 'New password: min 8 length',
    password: 'Passwords must be the same'
}

function showError(req) {
    return errors.innerText = messages[req]
}

function hiddenError() {
    return errors.innerText = ''
}

function submitFalse() {
    return submit.setAttribute('disabled', true)
}

function submitTrue() {
    return submit.removeAttribute('disabled')
}

function checkForm() {
    submitFalse()

    if (!currentEmail.value)
        return showError('currentemail')

    if (!currentPassword.value)
        return showError('currentpass')

    if (inputPassword.value.length < 8)
        return showError('length')

    if (inputConfirmPassword.value !== inputPassword.value)
        return showError('password')

    hiddenError()
    submitTrue()
}

function awaitEffectSuccessfuly() {
    submit.getElementsByClassName('await-spinner')[0].style.display = 'none'
    submit.getElementsByClassName('txt')[0].innerText = 'Password changed!'
    return
}

function awaitEffectTrue() {
    submit.setAttribute('disabled', 'true')
    submit.getElementsByClassName('await-spinner')[0].style.display = 'inline-block'
    submit.getElementsByClassName('txt')[0].innerText = 'Await...'
    return
}

function awaitEffectFalse() {
    submit.removeAttribute('disabled')
    submit.getElementsByClassName('await-spinner')[0].style.display = 'none'
    submit.getElementsByClassName('txt')[0].innerText = 'Save'
    return
}

function newObject() {
    return {
        referenceData: ref.value,
        currentEmail: currentEmail.value,
        currentPassword: currentPassword.value,
        newPassword: inputPassword.value,
        confirmPassword: inputConfirmPassword.value
    }
}

function changePassword(event) {
    event.preventDefault()
    checkForm()
    if (!errors.innerText) {

        awaitEffectTrue()

        axios.post(form.getAttribute('action'), newObject())
            .then(function(response) {
                if (response.status === 200) {
                    awaitEffectSuccessfuly()
                    notification({ title: "Password changed successfully!" }, "success")
                    if (!!location) {
                        let i = setInterval(function () {
                            clearInterval(i)
                            location.href = '/login'
                        }, 1700)
                    }
                } else {
                    awaitEffectFalse()
                    showError("500")
                    notification({ title: "500", message: "Internal Server Error" }, "error")
                }
            })
            .catch(function(err) {
                awaitEffectFalse()
                showError("400")
                notification({ title: "400", message: "Check your informations" }, "error")
            })

    }
}

if (!!form) {
    form.addEventListener('input', checkForm)
    form.addEventListener('submit', changePassword)
}