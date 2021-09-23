
const filterLoginData = (data) => {
    let { type, app_id, name, email } = data

    let splitEmail = email.split('@')

    let firstPart = splitEmail[0]
    let secondPart = splitEmail[1].split('.')
    let finalPart = secondPart.slice(1)

    secondPart = secondPart[0]

    if (finalPart.length > 1)
        finalPart[0] = '***'

    finalPart = finalPart.join('.')

    let newEmail = `${firstPart[0] || ''}${firstPart[1] || ''}${firstPart[2] || ''}****`
        newEmail += `@${secondPart[0] || ''}****.${finalPart}`

    return { type, app_id, name, email: newEmail }
}