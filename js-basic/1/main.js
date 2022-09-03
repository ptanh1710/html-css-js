var products = [
    {
        id: 1,
        name: 'Product 1',
        category: '',
        price: 2500,
    },
    {
        id: 2,
        name: 'Product 2',
        category: '',
        price: 1000,
    },
    {
        id: 3,
        name: 'Product 3',
        category: '',
        price: 3500,
    },
    {
        id: 4,
        name: 'Product 4',
        category: '',
        price: 1500,
    },
];

var wrapper = document.querySelector('#wrapper');

var i;
for (i = 0; i < products.length; i++) {
    wrapper.innerHTML += `<h2>
        Product: ${products[i].name} - ${products[i].price}
    </h2>`;
}

var h2 = document.querySelectorAll('h2');
// Error -> is having fixed
for (i = 0; i < h2.length; i++) {
    h2[i].addEventListener('click', function (e) {
        console.log(h2);
        // h2.splice(0, 1);

        // products.filter(function (a) {
        //     console.log(a.id === h2[i].id);
        // });
    });
}
