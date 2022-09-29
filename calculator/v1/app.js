const before_result = document.querySelector('.monitor .b-result');
const result = document.querySelector('.monitor .result');

const values = document.querySelectorAll('.control span');
const clear = document.querySelector('.control #clear');
const del = document.querySelector('.control #delete');

for (var i = 0; i < values.length; i++) {
    values[i].addEventListener('click', function (e) {
        switch (this.innerText) {
            case '=':
                before_result.innerText = result.innerText;
                result.innerText = eval(result.innerText);
                break;
            case 'AC':
                before_result.innerText = 'result';
                result.innerText = 0;
                break;
            case 'DEL':
                result.innerHTML == '' ? (result.innerHTML = 0) : (result.innerHTML = result.innerHTML.slice(0, -1));
                break;
            default:
                result.innerText += this.innerText;
        }
    });
}
