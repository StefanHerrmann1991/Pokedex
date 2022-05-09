
let pokemons = [];

async function searchPokemon() {
    getPokemonByName(pokemonName);
    showPokemonInfo(pokemon);
}

async function showPokemonInfo(pokemon) {
    document.getElementById('pokemonName').innerHTML = 'Name: ' + upperCase(pokemon['name']);
    document.getElementById('pokemonNumber').innerHTML = 'Number:' + (pokemon['id']);
    pokemonType(pokemon);
}

/**This function 
 * @param {pokemonNameUpperCase} - The word written with the first letter in uppercase.
 */

function upperCase(pokemonNameUpperCase) {
    return pokemonNameUpperCase.charAt(0).toUpperCase() + pokemonNameUpperCase.slice(1);
}

/* this function sets the color of a Pokemon depending on its type */
function pokemonType(pokemon) {
    let pokemonType = document.getElementById('pokemonType');
    pokemonType.innerHTML = "";
    for (let i = 0; i < pokemon['types'].length; i++) {
        const type = pokemon['types'][i]['type']['name'];
        pokemonType.innerHTML += `<h2 style="background-color: var(--normal);
        background-image: linear-gradient(deg, var(--${pokemon['types'][0]['type']['name']}), var(--${pokemon['types'][1]['type']['name']}) );">${type}</h2>
           `
    }
}


/**
 * Ask for Pokemon from Poke API
 * @param {number} i - pokemon ID that is asked for
 * */

async function getPokemonByName(pokemonName) {
    
    pokemonName  = document.getElementById('pokedexSearch').value;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let responsePokemon = await fetch(url);
    let pokemon = await responsePokemon.json();
    return pokemon;
}

/**
 * Ask for a pokemon from PokeAPI
 * @param {number} pokemonId PokemonId that is asked for.
 * @returns Returns the ID of a Pokemon.
 */

async function getPokemonById(pokemonId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    let responsePokemon = await fetch(url);
    let pokemon = await responsePokemon.json();
    return pokemon;
}

async function renderPokemon() {

    let pokemon = document.getElementById('allPokemon');
    pokemon.innerHTML = "";
    for (let i = 1; i < 10+1; i++) {
        currentPokemons = await getPokemonById(i);
        let typeOne = currentPokemons['types'][0]['type']['name'];
        let typeTwo;
        if (currentPokemons['types'].length == 1) {
            typeTwo = typeOne;
        } else {
            typeTwo = currentPokemons['types'][1]['type']['name'];
        }
        pokemon.innerHTML += `
        <div class="pokemon-card"  style="background-image: linear-gradient(to bottom, var(--${typeOne}) 40%, var(--${typeTwo}) );">
        <h2 class="mgn-l"><nobr>${upperCase(currentPokemons['name'])} # ${padLeadingZeros(currentPokemons['id'], 3)}</nobr></h2>
        <div class="pokemon-card-description">
        <div id="pokemonType-${i}"></div>
        <img class="pokemon-img" src="${currentPokemons['sprites']['front_default']}">
        </div>
        </div>`;

        let pokemonsType = document.getElementById(`pokemonType-${i}`);

        for (let j = 0; j < currentPokemons['types'].length; j++) {
            const type = currentPokemons['types'][j]['type']['name'];
            pokemonsType.innerHTML += `<div style="background: var(--${type})" class="pokemon-type-style pixel-shadow mgn-l mgn-b">${type}</div>`
        }
    }
}





function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}



