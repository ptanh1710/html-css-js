function changeMode() {
    var body = document.getElementsByTagName('body')
    console.log(body[0]);
    body[0].classList.toggle('dark-mode')
}