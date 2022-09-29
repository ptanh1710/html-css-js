/**
 * Pokemon API
 * https://pokeapi.co/api/v2/pokemon
 * https://www.pokemon.com/us/api/pokedex/kalos
 */

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';
const container = document.querySelector('.container');

fetch(POKEMON_API_URL)
    .then((res) => res.json())
    .then((data) => {
        getPokemon(data.results);
    })
    .catch((err) => console.log(err));

function getPokemon(data) {
    const ul = document.createElement('ul');
    container.appendChild(ul);
    const liElements = data.map((item) => {
        const d = `<li>
                        ${item.name}
                    </li>`;
        console.log(typeof d);
        return d;
    });
    const li = liElements.join('');
    ul.innerHTML = li;
    console.log(li);
    li.addEvenListener('click', function (e) {
        console.log(e.target);
    });
}

// getPokemon(data);
