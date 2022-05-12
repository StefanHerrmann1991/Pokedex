
let pokemons = [];

async function searchPokemon() {
    let pokemon = await getPokemonByName();
    showPokemonInfo(pokemon);
}

async function showPokemonInfo(pokemon) {

    document.getElementById('onePokemon').innerHTML =`
    <div>Name: ${upperCase(pokemon['name'])}</div>
    <div> Number:   ${(pokemon['id'])}</div>
    `;

}

/**
 * Ask for Pokemon from Poke API
 * @param {number} i - pokemon ID that is asked for
 * */

 async function getPokemonByName() {

    let pokemonName = document.getElementById('pokedexSearch').value;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let responsePokemon = await fetch(url);
    let pokemon = await responsePokemon.json();
    return pokemon;
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
    for (let i = 1; i < 10 + 1; i++) {
        currentPokemons = await getPokemonById(i);
        [typeOne, typeTwo] = comparePokomonType(currentPokemons);
        pokemon.innerHTML += `
        <div class="pokemon-card"  style="background-image: linear-gradient(to bottom, var(--${typeOne}) 40%, var(--${typeTwo}) );">
        <h2 class="mgn-l"><nobr>${upperCase(currentPokemons['name'])} # ${padLeadingZeros(currentPokemons['id'], 3)}</nobr></h2>
        <div class="pokemon-card-description">
        <div id="pokemonType-${i}"></div>
        <img class="pokemon-img" src="${currentPokemons['sprites']['front_default']}">
        </div>
        </div>`;
        pokemonsType = showPokemonType(currentPokemons, i);

    }
}




function showPokemonType(currentPokemons, i) {
    let pokemonsType = document.getElementById(`pokemonType-${i}`);
    for (let j = 0; j < currentPokemons['types'].length; j++) {
        const type = currentPokemons['types'][j]['type']['name'];
        pokemonsType.innerHTML += `<div style="background: var(--${type})" class="pokemon-type-style pixel-shadow mgn-l mgn-b">${type}</div>`
    }
    return pokemonsType;
}

/**The function load Pokemon types from the API and is used to compare if the pokemon have one or two types
 * 
 * @param {number} currentPokemons 
 * @returns Returns the type of the Pokemon.
 */

function comparePokomonType(currentPokemons) {
    let typeOne = currentPokemons['types'][0]['type']['name'];
    let typeTwo;
    if (currentPokemons['types'].length == 1) {
        typeTwo = typeOne;
    } else {
        typeTwo = currentPokemons['types'][1]['type']['name'];
    }
    return [typeOne, typeTwo];
}

/**The function inserts zeros as string before the id of a Pokemon
 * @param { number } num The number of the Pokemon
 * @param { number } size The number of zeros before the number of the Pokemon.
 * @returns A Pokemon number with three zeros before the actual Pokemon ID.
 */

function padLeadingZeros(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

/**This onclick function enables a detailed description of the chosen (by click or by search) Pokemon.
 * 
 * 
*/

function pokemonCardBigView() {

}

/* function load() {
    loadImages(25); //hier muss die Anzahl an Bildern rein
    for (i = 0; i < images.length; i++) {
        document.getElementById('img').innerHTML += `
        <img id="${i}" onmouseenter="zoomIn(${i})" onmouseleave="zoomOut(${i})" onclick="showImg(${i})" class="img-box" src="${images[i]}"<img>
     `}
}
function loadImages(numberOfPictures) { //die Funktion lädt Bilder der Form Zahl.jpg
    for (let i = 1; i < numberOfPictures + 1; i++) {
        images.push(`img/${i}.jpg`);
    }

}
function zoomIn(i) {
    document.getElementById(i).classList.add('zoom-in');
}


function zoomOut(i) {
    document.getElementById(i).classList.remove('zoom-in');
}

function showImg(i) {
    document.getElementById('big-img').innerHTML = `
    <div class="dialogue-bg" id="black-screen"><div class="close-btn mgn-top mgn-right"><button class="button"  onclick="closeImg()"><span class="material-icons-outlined">close</span></button></div>
    <div class="dialogue-bg-child"><button class="button mgn-left"  onclick="lastImg(${i})"><span class="material-icons-outlined">arrow_back</span></button>
    <img class="img-box-big" id="black-screen-img">
    <button class="button mgn-right"  onclick="nextImg(${i})"><span class="material-icons-outlined">arrow_forward</span></button> 
    </div>
    </div>
     `
    document.getElementById('black-screen-img').src = `img/${i + 1}.jpg`;

}
function nextImg(i) {
    {
        if (i < images.length - 1) {
            i++;
        } else {
            i = 0;
        }
        document.getElementById('black-screen-img').innerHTML = '';
        showImg(i);
    }
}

function lastImg(i) {
    if (i > 0) {
        i--;
    }
    else {
        i = images.length - 1;
    }
    document.getElementById('black-screen-img').innerHTML = '';
    showImg(i);
}

function closeImg() {

    document.getElementById('black-screen').classList.add('d-none');}



/* i in currentImage umbennenen zum besseren Verständnis 
 document.getElementById('black-screen').classList.remove('dialogue-bg');
    document.getElementById('img-box-big').classList.remove('black-screen-img');*/

/* function openImage() {
    openImage(currentImage);
    currentImage++;
    if (currentImage == images.length) {
        currentImage = 0;
    }
} */