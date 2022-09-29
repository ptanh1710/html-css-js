const poke_container = document.getElementById('container');
const pokemonElRow = document.createElement('div');
pokemonElRow.classList.add('row');

// Color

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

console.log(POKEMON_TYPE_COLORS.normal);
// Quantity Pokemon number
const pokes_number = 20;

const fetchPokemon = async () => {
    for (var i = 1; i <= pokes_number; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
};

fetchPokemon();

function createPokemonCard(pokemon) {
    const pokemonElCol = document.createElement('div');
    pokemonElCol.classList.add('col', 'col-lg-4', 'col-md-6', 'col-sm-12');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const image = `https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`;
    const type = pokemon.types
        .map((type) => {
            const t = type.type.name;
            const color = POKEMON_TYPE_COLORS[t];
            return `<span style="--color-type: ${color}">${t}</span>`;
        })
        .join('');
    const pokeInnerHTML = `
        <div class="card" style="width: 18rem; margin: 2rem">
            <img src="${image}" alt=${name} class="card-img-top img-thumbnail"/>
            <div class="card-body">
                <h5 class="card-title">${pokemon.id} - ${name}</h5>
                <small class="type">
                  ${type}
                </small>
            </div>
        </div>
       
    `;
    pokemonElCol.innerHTML = pokeInnerHTML;
    pokemonElRow.appendChild(pokemonElCol);

    poke_container.appendChild(pokemonElRow);
}
