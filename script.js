
let currentPokemon;
async function loadPokemon() {
    let pokedexSearch = document.getElementById('pokedexSearch').value.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon/${pokedexSearch}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('loaded pokemon', currentPokemon);
    showPokemonInfo();
}


function showPokemonInfo() {
    if (currentPokemon['name'] == undefined) { document.getElementById('pokemonName').innerHTML = 'Which Pokemon do you want to search? Bibarel' }
    else {
        document.getElementById('pokemonName').innerHTML = 'Name: ' + upperCase(currentPokemon['name']);
        document.getElementById('pokemonNumber').innerHTML = 'Number:' + (currentPokemon['id']);
        pokemonType();
    }
}

function upperCase(pokemonNameUpperCase) {
    return pokemonNameUpperCase.charAt(0).toUpperCase() + pokemonNameUpperCase.slice(1);
}

function renderPokemon() {
let loadedPokemon = document.getElementById('allPokemon');
loadedPokemon = '';

for (let i = 0; i < array.length; i++) {

loadedPokemon.innerHTML += `<div></div>`
}
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


/* class="pokemon-${(type).toLowerCase()}"

background-image: linear-gradient(to left, rgba(var(--${currentPokemon['types'][0]['type']['name']})), rgba(var(--${currentPokemon['types'][1]['type']['name']})));">${type}</h2>

 */