const contactForm = document.getElementById('contact-form')

function resetForm() {
    contactForm.reset()
    return
}

function checkPhoneNumber(number) {
    number = number.replace(/[^+0-9]/, '')
    return number
}

function checkEmailAddress(email) {
    email = email.replace(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g, '')
    return !email
}

async function send(name, emailaddress, subject, phone, comment, recaptcha) {

    await axios.post('http://localhost:3000/contact', {
        name: name,
        email: emailaddress,
        subject: subject,
        phone: phone,
        message: comment,
        recaptcha: recaptcha
    })
        .then(function (response) {
            resetForm()
            if (response.status >= 200 && response.status < 300) {
                return notification({ message: response.data.message }, "success", true)
            }
            return
        })
        .catch(function (err) {
            if (err) {
                return notification({ message: "Internal Server Error" }, "error")
            }
            return
        })

}

function sendMessage(event) {
    event.preventDefault()

    const inputName = document.getElementById('name')
    const inputEmailAddress = document.getElementById('emailaddress')
    const inputSubject = document.getElementById('subject')
    const inputPhoneNumber = document.getElementById('phone-number')
    const inputComment = document.getElementById('comments')
    const inputReCAPTCHA = document.getElementById('g-recaptcha-response')

    if (!inputName.value) {
        return notification({ message: "'Name' is required" })
    }
    if (checkEmailAddress(inputEmailAddress.value) && inputEmailAddress.value.length < 1) {
        return notification({ message: "Email invalid format" })
    }
    if (!inputSubject.value) {
        return notification({ message: "'Subject' is required" })
    }
    inputPhoneNumber.value = checkPhoneNumber(inputPhoneNumber.value)
    if (!inputComment.value) {
        return notification({ message: "'Message' is required" })
    }
    if (!inputReCAPTCHA.value) {
        return notification({ message: "'reCAPTCHA' is required" })
    }

    send(inputName.value, inputEmailAddress.value, inputSubject.value, inputPhoneNumber.value, inputComment.value, inputReCAPTCHA.value)

    return
}

contactForm.addEventListener('submit', sendMessage)