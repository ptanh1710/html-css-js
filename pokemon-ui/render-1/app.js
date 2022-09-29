const POKEMON_TYPE_COLORS = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

const main_types = Object.keys(POKEMON_TYPE_COLORS);
console.log(main_types);

const contentElement = document.querySelector('.content');

const POKEMON_QUANTITY_FETCH = 105;

async function fetchPokemon() {
    for (var i = 1; i <= POKEMON_QUANTITY_FETCH; i++) {
        await getPokemon(i);
    }
}

async function getPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createCardPokemon(pokemon);
}

fetchPokemon();

function createCardPokemon(pokemon) {
    // console.log(pokemon);
    const id = pokemon.id < 10 ? '00' + pokemon.id : pokemon.id < 100 ? '0' + pokemon.id : pokemon.id;
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const background_color = POKEMON_TYPE_COLORS[pokemon.types[0].type.name];
    console.log(background_color);
    const type = pokemon.types
        .map((d) => {
            const type_name = d.type.name;
            const type_color = POKEMON_TYPE_COLORS[type_name];
            return `<span style="--type-color: ${type_color}">${type_name}</span>`;
        })
        .join('');
    const cardElementItems = `
            <div class="card" style="--bg-color: ${background_color}">
            <div class="card__image">
                <img src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" alt="${name}" />
            </div>
            <div class="card__body">
                <h4 class="card__body-title">${id} - ${name}</h4>
                <small class="type">
                    ${type}
                </small>
            </div>
        </div>
    `;
    const cardElementItem = cardElementItems;

    contentElement.innerHTML += cardElementItem;
}
