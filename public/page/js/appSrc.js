const form = document.getElementById('register-form')
const companyName = document.getElementById('name')
const email = document.getElementById('emailaddress')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('cpassword')
const check = document.getElementById('checkbox-signup')
const submit = document.getElementById('button-submit')
const errors = document.getElementById('display-errors')

const messages = {
    name: 'Company Name is required',
    email: 'Email is required',
    length: 'Min 8 length',
    password: 'Passwords must be the same',
    check: 'Accept the Terms and Conditions'
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

function checkInputs() {
    submitFalse()

    if (companyName.value === '')
        return showError('name')

    if (email.value === '')
        return showError('email')

    if (password.value.length < 8)
        return showError('length')

    if (password.value !== confirmPassword.value)
        return showError('password')

    if (!check.checked)
        return showError('check')

    hiddenError()
    submitTrue()
    return
}

form.addEventListener('input', checkInputs)