const form = document.getElementById('register-form')
const companyName = document.getElementById('name')
const email = document.getElementById('emailaddress')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('cpassword')
const check = document.getElementById('checkbox-signup')
const submit = document.getElementById('button-submit')
const errors = document.getElementById('display-errors')
const passErrors = document.getElementsByClassName('password-errors')[0]

const messages = {
    name: 'Company is required',
    email: 'Email is required',
    check: 'Accept the Terms and Conditions'
}

let passwordErrors = {
    length: {
        status: false,
        message: 'Between 8 and 48 characters'
    },
    numbers: {
        status: false,
        message: 'Contains numbers'
    },
    special: {
        status: false,
        message: 'Contains special characters [!,@,#,$,%,^,&,*]'
    }
}

function showError(req) {
    return errors.innerText = messages[req]
}

function hiddenError() {
    return errors.innerText = ''
}

function showPasswordError() {
    let errorList = []
    const keys = Object.keys(passwordErrors)
    keys.forEach(function (key) {
        let div = document.createElement('div')

        div.innerText = passwordErrors[key].message

        if (passwordErrors[key].status) {
            div.className = 'text-success'
        } else {
            div.className = 'text-danger'
        }

        errorList.push(div)
    })

    passErrors.innerText = ''
    errorList.forEach(function(err) {
        passErrors.appendChild(err)
    })
}

function showConfirmPasswordError() {
    confirmPassword.parentNode.classList.remove('border-success')
    confirmPassword.parentNode.classList.add('border-danger')
    return
}

function hiddenConfirmPasswordError() {
    confirmPassword.parentNode.classList.remove('border-danger')
    confirmPassword.parentNode.classList.add('border-success')
    return
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

    const passwordValue = password.value

    if (passwordValue.length < 8 || passwordValue.length > 48) {
        passwordErrors.length.status = false
    } else {
        passwordErrors.length.status = true
    }

    if (!passwordValue.replace(/\D/g, '')) {
        passwordErrors.numbers.status = false
    } else {
        passwordErrors.numbers.status = true
    }

    if (!passwordValue.replace(/[^!@#$%^&*]/g, '')) {
        passwordErrors.special.status = false
    } else {
        passwordErrors.special.status = true
    }

    showPasswordError()

    if (companyName.value === '')
        return showError('name')

    if (email.value === '')
        return showError('email')

    if (!passwordErrors.length.status || !passwordErrors.numbers.status || !passwordErrors.special.status)
        return hiddenError()

    if (passwordValue !== confirmPassword.value)
        return showConfirmPasswordError()
    else
        hiddenConfirmPasswordError()

    if (!check.checked)
        return showError('check')

    hiddenError()
    submitTrue()
    return
}

form.addEventListener('input', checkInputs)