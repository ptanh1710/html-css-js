function changeColor() {
    var hex_numbers = ['1','2','3','4','5','6','7','8','9','A', 'B', 'C', 'D', 'E', 'F']

    var hex_code = '';
    var wrapper = document.getElementById('wrapper')

    for(var i = 1; i<=6; i++) {
        var random_index = Math.floor(Math.random() * hex_numbers.length);

        hex_code += hex_numbers[random_index];


        // console.log(hex_code += hex_numbers[random_index])
    }

    document.getElementById('hex-color').innerHTML = hex_code
    wrapper.style.backgroundColor = '#' + hex_code
}
