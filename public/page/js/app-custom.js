
const logoNavbar = document.getElementsByClassName('logo-navbar')[0]

const initCustomStyle = function() {

    window.addEventListener('scroll', function() {
        let top = window.scrollY

        if (top > 100) {
            logoNavbar.style.visibility = 'visible'
        } else {
            logoNavbar.style.visibility = 'hidden'
        }
    })

    return
}

window.addEventListener('load', initCustomStyle)