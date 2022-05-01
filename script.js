
let currentPokemon;
let currentPokemons;
let defaultPokemon = 'pikachu'
async function loadPokemon() {
    let pokedexSearch = document.getElementById('pokedexSearch').value.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon/${pokedexSearch}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('loaded pokemon', currentPokemon);
    showPokemonInfo();
 }



async function showPokemonInfo() {
    if (currentPokemon['name'] == undefined) { 
        let defaultUrl = `https://pokeapi.co/api/v2/pokemon/${defaultPokemon}`;
        let response = await fetch(defaultUrl)
        defaultPokemon = await response.json();
        document.getElementById('pokemonName').innerHTML = upperCase(defaultPokemon['name']);}
    else {
        document.getElementById('pokemonName').innerHTML = 'Name: ' + upperCase(currentPokemon['name']);
        document.getElementById('pokemonNumber').innerHTML = 'Number:' + (currentPokemon['id']);
        pokemonType();
    }
}

function upperCase(pokemonNameUpperCase) {
    return pokemonNameUpperCase.charAt(0).toUpperCase() + pokemonNameUpperCase.slice(1);
}

async function renderPokemon() {
   
    let pokemons = document.getElementById('allPokemon');
    pokemons.innerHTML = "";
      for (let i = 1; i < 12; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let responsePokemon = await fetch(url);
        currentPokemons = await responsePokemon.json();
        pokemons.innerHTML += `<div>${currentPokemons['name']}<div>`;
    }

    /* button mit i + 50 */
}


/* this function sets the color of a Pokemon depending on its type */
function pokemonType() {
    let pokemonType = document.getElementById('pokemonType');
    pokemonType.innerHTML = "";
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        const type = currentPokemon['types'][i]['type']['name'];

        pokemonType.innerHTML += `<h2 style="background-color: var(--normal);
        background-image: linear-gradient(90deg, var(--${currentPokemon['types'][0]['type']['name']}), var(--${currentPokemon['types'][1]['type']['name']}) );">${type}</h2>
           `
    }
}
