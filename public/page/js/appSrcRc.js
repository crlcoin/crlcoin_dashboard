const form = document.getElementById('form')
const inputPassword = document.getElementById('password')
const inputConfirmPassword = document.getElementById('confirmpassword')
const submit = document.getElementById('submit')
const errors = document.getElementById('error')

const messages = {
    length: 'Min 8 length',
    password: 'Passwords must be the same'
}

function showError(req) {
    return errors.innerText = messages[req]
}

function hiddenError() {
    return errors.innerText = ''
}

function submitFalse() {
    submit.setAttribute('disabled', true)
    submit.classList.remove('btn-success')
    submit.classList.add('btn-primary')
    return
}

function submitTrue() {
    submit.removeAttribute('disabled')
    submit.classList.remove('btn-primary')
    submit.classList.add('btn-success')
    return
}

function checkForm() {
    submitFalse()

    if (inputPassword.value.length < 8)
        return showError('length')

    if (inputConfirmPassword.value !== inputPassword.value)
        return showError('password')

    hiddenError()
    submitTrue()
}

form.addEventListener('input', checkForm)