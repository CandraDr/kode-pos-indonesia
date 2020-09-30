// Responsive menu
function openMenu(button) {
    const close = 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
    const open = 'M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'

    const buttonToggle = button.querySelector("svg path")
    const menu = document.querySelector("#menu")

    if(buttonToggle.getAttribute("d") === close) {
        buttonToggle.setAttribute("d", open)
        menu.classList.add("hidden")
    } else {
        buttonToggle.setAttribute("d", close)
        menu.classList.remove("hidden")
    } 
}

// Reset range kode pos dan list kabupaten
function reset() {
    const kodePos = document.querySelector("#kodePos")
    const detail = document.querySelector("#listKelurahan")
    
    kodePos.parentNode.classList.add("hidden")
    kodePos.innerHTML = ''
    detail.innerHTML = ''
}

// Tampil tooltip ketika mouse hover
function tooltip() {
    
}

function copy(button) {
    const copyText = button.previousElementSibling.innerHTML
    const alert = document.querySelector("#alert")
    const template = document.createElement("input")

    template.setAttribute("value", copyText)
    document.body.appendChild(template)
    template.select()
    document.execCommand("copy")
    document.body.removeChild(template)

    alert.querySelector("p").innerHTML = "Sukses disalin: " + copyText
    alert.classList.remove("hidden")
    setTimeout(() => alert.classList.add("hidden"), 3000)
}