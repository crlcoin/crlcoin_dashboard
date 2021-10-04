function translate(lang) {
    let elements = document.querySelectorAll('[data-translate-block]')
    for (const block of elements) {

        let blockValue = block.getAttribute('data-translate-block')
        let parts = block.querySelectorAll('[data-translate-part]')
        let form = block.querySelectorAll('[data-translate-form-part]')

        let currentWords = words[lang][blockValue]

        for (const part of parts) {

            let partValue = part.getAttribute('data-translate-part')

            part.innerText = currentWords[partValue]

        }

        for (const part of form) {

            let partValue = part.getAttribute('data-translate-form-part')
            let label = part.querySelector('[data-translate-form-label]')
            let input = part.querySelector('[data-translate-form-input]')

            if (!!label)
                label.innerText = currentWords[partValue].title

            if (!!input)
                input.placeholder = currentWords[partValue].placeholder

        }

    }

    return
}

!(function(options) {

    for (const element of options) {
        element.addEventListener('click', function() {
            translate(element.getAttribute('value'))
        })
    }

})(document.getElementsByClassName('translate'))