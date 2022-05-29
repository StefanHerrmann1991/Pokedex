
let pokemons = [];
let allLoadedPokemons = [];
let onePokemonScreen = false;


async function init() {
    await loadPokemonInArray();
    renderPokemon();
}

async function searchPokemon() {
    let pokemon = await getPokemonByName();
    showPokemonInfo(pokemon);
}

async function showPokemonInfo(pokemon) {

    document.getElementById('onePokemon').innerHTML = `
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
 * @param {pokemonNameUpperCase} The word written with the first letter in uppercase.
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

async function loadPokemonInArray() {

    for (let j = 1; j < 10 + 1; j++) {
        currentPokemon = await getPokemonById(j);
        allLoadedPokemons.push(currentPokemon)
    }
}

function renderPokemon() {
    let pokemon = document.getElementById('allPokemon');
    pokemon.innerHTML = "";
    for (let i = 0; i < allLoadedPokemons.length; i++) {
        let loadedPokemon = allLoadedPokemons[i];
        [typeOne, typeTwo] = comparePokemonType(loadedPokemon);
        pokemon.innerHTML += `
        <div class="pokemon-card" id="pokemonCard-${i}" onclick="showDetailedPokemonScreen(${i})"
        style="background-image: linear-gradient(to bottom, var(--${typeOne}) 40%, var(--${typeTwo}));">
        <h2 class="mgn-l"><nobr>${upperCase(loadedPokemon['name'])} # ${padLeadingZeros(loadedPokemon['id'], 3)}</nobr></h2>
        <div class="pokemon-card-description">
        <div id="pokemonType-${i}"></div>
        <img class="pokemon-img" src="${loadedPokemon['sprites']['front_default']}">
        </div>
        </div>`;
        pokemonsType = showPokemonType(loadedPokemon, i);
        console.log(loadedPokemon);
    }
}


async function showDetailedPokemonScreen(i) {
    let currentPokemon = allLoadedPokemons[i];
    let oneDetailedPokemonCard = document.getElementById('onePokemon');
    let pokemonAbility = await getPokemonInformation(currentPokemon, 'abilities', 'ability');
    let pokemonMoves = await getPokemonInformation(currentPokemon, 'moves', 'move');

    if (!onePokemonScreen) {
        document.getElementById('allPokemon').classList.add('all-pokemon-open-menu');
        setTimeout(function () { oneDetailedPokemonCard.classList.add('detailed-pokemon-static') }, 500);
        setTimeout(
            function () {
                oneDetailedPokemonCard.innerHTML = `
            <div class="one-pokemon-screen">
            <div class="one-pokemon-header">
            <h2 class="typingAnimation">${upperCase(currentPokemon['name'])} # ${padLeadingZeros(currentPokemon['id'], 3)}</h2>
            <img class="pokemon-img big-img" src="${currentPokemon['sprites']['front_default']}">
            <div class="align-items" id="onePokemonType-${i}" ></div>
            </div>
            <div>Abilities: ${pokemonAbility} </div>
            <div>Moves: ${pokemonMoves} </div>
            <div>Weight: </div>
            <div>Height: </div>
            </div>
        `
                showPokemonTypeOnePokemon(currentPokemon, i)
            }
            , 5000)
    }
    else {
        oneDetailedPokemonCard.classList.remove('detailed-pokemon-static');
        document.getElementById('allPokemon').classList.remove('all-pokemon-open-menu');
        oneDetailedPokemonCard.innerHTML = '';
    }
}

function getPokemonInformation(currentPokemon, properties, property) {
    let pokemonProperty = [];
    for (let y = 0; y < currentPokemon[properties].length; y++) {
        const element = currentPokemon[properties][y][property]['name'];
        pokemonProperty.push(element);
    }
    return [pokemonProperty];
}

function searchTopic(jsonSubmenus) {
    let jsonSubmenu = [];
    for (let k = 0; k < jsonSubmenus.length; k++) {
        jsonSubmenu.push(jsonSubmenus[k]);
    }
    return [jsonSubmenu];
}

function closeOnePokemonScreen() {
    if (onePokemonScreen) {
        document.getElementById('allPokemon').classList.remove('all-pokemon-open-menu');
        document.getElementById('onePokemon').classList.remove('one-pokemon');
    }
    else {
        document.getElementById('allPokemon').classList.add('all-pokemon-open-menu');
        document.getElementById('onePokemon').classList.add('one-pokemon');
    }
}


function assignToId(name, arrays, index) {
    let nameId = document.getElementById(`${name}-${index}`)
    for (let m = 0; m < arrays.length; m++) {
        const array = array[i];
    }
    return [index, name, nameId]
}

function showPokemonTypeOnePokemon(currentPokemons, i) {
    let pokemonsType = document.getElementById(`onePokemonType-${i}`);
    for (let j = 0; j < currentPokemons['types'].length; j++) {
        const type = currentPokemons['types'][j]['type']['name'];
        pokemonsType.innerHTML += `<div style="background: var(--${type})" class="pokemon-type-style pixel-shadow mgn-l mgn-b">${type}</div>`
    }
    return pokemonsType;
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

function comparePokemonType(currentPokemons) {
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




/* function nextImg(i) {
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
    pokemonCardDetailedInformation(i);
} */

/* 


function load() {
    loadImages(25); //hier muss die Anzahl an Bildern rein
    for (i = 0; i < images.length; i++) {
        document.getElementById('img').innerHTML += `
        <img id="${i}"  onclick="showImg(${i})" class="img-box" src="${images[i]}"<img>
     `}
}
function loadImages(numberOfPictures) { //die Funktion lädt Bilder der Form Zahl.jpg
    for (let i = 1; i < numberOfPictures + 1; i++) {
        images.push(`img/${i}.jpg`);
    }

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