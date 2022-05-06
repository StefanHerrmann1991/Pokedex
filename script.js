

let currentPokemon;
let currentPokemons;
let defaultPokemon = 'pikachu'


async function searchPokemon() {
    getPokemonByName(pokemonName);
    showPokemonInfo();
}



async function showPokemonInfo() {
    if (currentPokemon['name'] == undefined) {
     await getPokemon(defaultPokemon);
        document.getElementById('pokemonName').innerHTML = upperCase(defaultPokemon['name']);
    }
    else {
        document.getElementById('pokemonName').innerHTML = 'Name: ' + upperCase(currentPokemon['name']);
        document.getElementById('pokemonNumber').innerHTML = 'Number:' + (currentPokemon['id']);
        pokemonType();
    }
}

function upperCase(pokemonNameUpperCase) {
    return pokemonNameUpperCase.charAt(0).toUpperCase() + pokemonNameUpperCase.slice(1);
}

/**
 * @param {number} 
 * @param
 * */

 async function getPokemonByName(pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let responsePokemon = await fetch(url);
    let pokemon = await responsePokemon.json(); 
    return pokemon;
}


async function getPokemonById(pokemonId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    let responsePokemon = await fetch(url);
    let pokemon = await responsePokemon.json(); 
    return pokemon;
}

async function renderPokemon() {

    let pokemons = document.getElementById('allPokemon');
    pokemons.innerHTML = "";
    for (let i = 1; i < 10; i++) {
         currentPokemons = await getPokemon(i);
        let typeOne = currentPokemons['types'][0]['type']['name'];
        let typeTwo;
        if (currentPokemons['types'].length == 1) {
            typeTwo = typeOne;
        } else {
            typeTwo = currentPokemons['types'][1]['type']['name'];
        }
        pokemons.innerHTML += `
        <div class="pokemon-card" style="background-image: linear-gradient(to bottom, var(--${typeOne}), var(--${typeTwo}) );">
        
        <h2 class="mgn-l">${upperCase(currentPokemons['name'])} # ${padLeadingZeros(currentPokemons['id'], 3)}</h2>
        <div class="border"></div>
        <img src="${currentPokemons['sprites']['front_default']}"<div>
        <div id="pokemonType-${i}"></div>`;

        let pokemonsType = document.getElementById(`pokemonType-${i}`);
       
        for (let j = 0; j < currentPokemons['types'].length; j++) {
            const type = currentPokemons['types'][j]['type']['name'];
            pokemonsType.innerHTML += `<div class="mgn-l mgn-b">${type}</div>`
        }
    }

    /* button mit i + 50 */
}



function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}



/* function linearGradientType(typeOne, typeTwo, currentPokemons) {
   
   if (!)  
   typeOne = `var(--${currentPokemons['types'][0]['type']['name']})`
   typeTwo = `var(--${currentPokemons['types'][1]['type']['name']})`
} */

/* this function sets the color of a Pokemon depending on its type */
function pokemonType(pokemon) {
    let pokemonType = document.getElementById('pokemonType');
    pokemonType.innerHTML = "";
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        const type = currentPokemon['types'][i]['type']['name'];
        pokemonType.innerHTML += `<h2 style="background-color: var(--normal);
        background-image: linear-gradient(90deg, var(--${currentPokemon['types'][0]['type']['name']}), var(--${currentPokemon['types'][1]['type']['name']}) );">${type}</h2>
           `
    }
}