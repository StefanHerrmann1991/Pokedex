/**
 * In this array all Pokemon from the API will be pushed.
 * @type {Array.json} 
 */
let allLoadedPokemons = [];
/**
 * The variable serves as test if the detailed Pokemon window on the left side of the screen has been opened.
 * @type {boolean}
 */
let onePokemonScreen = false;

/**
 * In this variable the number of loaded Pokemon is stored in case more Pokemon needs to be loaded.
 */
let numberOfLoadedPokemons = 0;



/**
 * This function loads and renders the pokemon in an array when the side is loaded
 */
async function init() {
  await loadPokemonInArray();
  renderPokemon();
}

/**
 * this function loads a pokemon from the pokemon API and then shows information about it
 */
async function searchPokemon() {
  let pokemon = await getPokemonByName();
  showPokemonInfo(pokemon);
}


/**
 * The function shows information about a searched pokemon,
 * further it sets its name to upper case.
 * @param {number|string} pokemon - ID of the pokemon or its name
 */
async function showPokemonInfo(pokemon) {

  document.getElementById('onePokemon').innerHTML = `
    <div>Name: ${upperCase(pokemon['name'])}</div>
    <div> Number:   ${(pokemon['id'])}</div>
    `;
}

/**
 * Ask for Pokemon from Poke API
 * 
 * */

async function getPokemonByName() {

  let pokemonName = document.getElementById('pokedexSearch').value;
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  let responsePokemon = await fetch(url);
  let pokemon = await responsePokemon.json();
  return pokemon;
}
/**
 * The functions takes a word and returns the string with the first letter in upper case
 * @param {string} pokemonNameUpperCase - The string which first letter should be written in upper case
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
  }
}

/* function savePokemon(arr) {
  let variableAsText = arr + 'asText';
  let arrays = JSON.stringify(arr);
  localStorage.setItem(`${arrays}`, variableAsText);
}

function loadPokemon(arr) {
  let variableAsText = localStorage.getItem(`${arrays}`);
  if (postsAsText) {
    posts = JSON.parse(postsAsText);
  }
} */

async function showDetailedPokemonScreen(i) {
  let oneDetailedPokemonCard = document.getElementById('onePokemon');
  if (window.innerWidth <= 700 && !onePokemonScreen) {
    document.getElementById('allPokemon').classList.add('d-none');
    oneDetailedPokemonCard.classList.add('detailed-pokemon-static-2');
    createOnePokemonScreen(i, oneDetailedPokemonCard);
    onePokemonScreen = true;
  }
  if (window.innerWidth > 700 && !onePokemonScreen) {
    document.getElementById('allPokemon').classList.add('all-pokemon-open-menu');
    setTimeout(() => {
      oneDetailedPokemonCard.classList.add('detailed-pokemon-static');
    }, 500);
    setTimeout(() => {
      createOnePokemonScreen(i, oneDetailedPokemonCard);
      onePokemonScreen = true;
    }, 5000)
  }
  if (onePokemonScreen) {
    createOnePokemonScreen(i, oneDetailedPokemonCard);
  }
}

function createOnePokemonScreen(i, oneDetailedPokemonCard) {
  let currentPokemon = allLoadedPokemons[i];
  [typeOne, typeTwo] = comparePokemonType(currentPokemon);
  oneDetailedPokemonCard.innerHTML = renderDetailedPokemonScreen(currentPokemon, i, typeOne, typeTwo)
  renderPokemonInformation(currentPokemon, i);
  insertCross(i);
  showPokemonTypeOnePokemon(currentPokemon, i);
}


function renderDetailedPokemonScreen(currentPokemon, i, typeOne, typeTwo) {
  return `  <div class="one-pokemon-screen">
            <div class="outer-polygon">
            <div class="border-one-pokemon">
            <div class="one-pokemon-header" style="background-image: linear-gradient(to bottom, var(--${typeOne}) 40%, var(--${typeTwo}));">
            <h2>${upperCase(currentPokemon['name'])} # ${padLeadingZeros(currentPokemon['id'], 3)}</h2>
            <img class="pokemon-img big-img" src="${currentPokemon['sprites']['front_default']}">
            <div class="align-items" id="onePokemonType-${i}"></div>
            </div>
            </div>
            </div>
            <div class="one-pokemon-details">
            <div class="mgn-l">
            <div id="abilities-${i}"></div>
            <div id="weight-${i}"></div>
            <div id="height-${i}"></div> 
            </div>
            <div id="crossPosition"></div>
            </div> 
            </div>        
        `;
}

function renderPokemonInformation(currentPokemon, i) {
  getHeight(currentPokemon, i);
  getWeight(currentPokemon, i);
  getAbilities(currentPokemon, i);
}

function getHeight(currentPokemon, i) {
  let height = document.getElementById(`height-${i}`);
  let text = `<div>Height: ${currentPokemon['height']}</div>`;
  height.insertAdjacentHTML('afterbegin', text);
};

function getWeight(currentPokemon, i) {
  let weight = document.getElementById(`weight-${i}`);
  let text = `<div>Weight: ${currentPokemon['weight']}</div>`;
  weight.insertAdjacentHTML('afterbegin', text);
};

async function getAbilities(currentPokemon, i) {
  let abilities = document.getElementById(`abilities-${i}`);
  let pokemonAbility = await getPokemonInformation(currentPokemon, 'abilities', 'ability', 'name');
  console.log(pokemonAbility)
  let text = `<div>Abilities: ${pokemonAbility}</div>`;
  abilities.insertAdjacentHTML('afterbegin', text);
};


async function getPokemonStats(currentPokemon, i) {
  let abilities = document.getElementById(`abilities-${i}`);
  let pokemonAbility = await getPokemonInformation(currentPokemon, 'base_stat', 'stats');
}

/**
 * The function searches through the list of pokemon JSON objects and returns there properties.
 * 
 * @param {string|number} currentPokemon Is equivalent to the number or name of the current Pokemon.
 * @param {string} properties If a property from a menu of an object is given.
 * @param {string} property If a single or more properties from a submenu of an object is given.
 * @param {string} name If the name of an object is given.
 * @returns A specific Pokemon property.
 */

function getPokemonInformation(currentPokemon, properties, property, name) {
  let pokemonProperty = [];
  if (name) {
    for (let y = 0; y < currentPokemon[properties].length; y++) {
      const element = currentPokemon[properties][y][property][name];
      pokemonProperty.push(element);
    }
  }
  else {
    for (let y = 0; y < currentPokemon[properties].length; y++) {
      const element = currentPokemon[properties][y][property];
      pokemonProperty.push(element);
    }
  }
  return [pokemonProperty];
}

/**
 * The function enables the responsivness of the cross element.
 * 
 * @param {number} i The current Pokemon ID.
 */

function insertCross(i) {
  let crossPosition = document.getElementById('crossPosition');
  if (window.innerWidth <= 700) {
    let text = generateCross(200, i);
    crossPosition.insertAdjacentHTML('afterbegin', text)
  };
  if (window.innerWidth > 700 && window.innerWidth < 1100) {
    let text = generateCross(150, i);
    crossPosition.insertAdjacentHTML('afterbegin', text)
  };
  if (window.innerWidth > 1100) {
    let text = generateCross(150, i);
    crossPosition.insertAdjacentHTML('afterbegin', text)
  };
}

/**
 * This function generates a cross with an area function fitting the img of the cross element.
 * Depending of the side length the scale of the cross element is determined.
 * @param {number} sideLength The side length of the cross element.
 * @param {number} i the current Pokemon ID 
 * @returns {string} Returns the cross properties.
 */

function generateCross(sideLength, i) {

  let coord1 = sideLength * 3 / 8;
  let coord2 = sideLength * 5 / 8;
  cross = `
      <img class='cross-map' src='PNG/Cross.png' usemap='#image-map' height="${sideLength}px" width="${sideLength}px">
        <map name='image-map'>
            <area target="" alt="up"    title="up"      coords="${coord1},0,${coord2},${coord1}" shape="rect">
            <area target="" alt="left"  title="left"    onclick="lastPokemon(${i})" coords="0,${coord1},${coord1},${coord2}" shape="rect">
            <area target="" alt="down"  title="down"    coords="${coord2},${coord2},${coord1},${sideLength}" shape="rect">
            <area target="" alt="right" title="right"   onclick="nextPokemon(${i})"  coords="${sideLength},${coord1},${coord2},${coord2}" shape="rect">   
        </map> `;
  return cross;
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

/**
 * When the user scrolls down new Pokemon will be loaded and then rendered on the screen.
 * It loads always 10 new Pokemon when the scrollbar hits the button.
 */
window.onscroll = async function () {
  if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
    numberOfLoadedPokemons += 10;
    await loadPokemonInArray();
    renderPokemon();
  }
}
/**
 * The function loads a certain number of Pokemon and pushes them into the allLoadedPokemons array.
 */

async function loadPokemonInArray() {
  for (let j = allLoadedPokemons.length + 1; j < numberOfLoadedPokemons + 20; j++) {
    currentPokemon = await getPokemonById(j);
    allLoadedPokemons.push(currentPokemon);
  }
}

/**
 * The function disables the double click of the cross element in the Pokemon detailed screen view.
 * @param {string} event Mouse Event which needs to be prevented.
 */

document.addEventListener('mousedown', function (event) {
  if (event.detail > 1) {
    event.preventDefault();
    }
}, false);

/**
 * The function increments the number of the PokemonID and renders the new Pokemon. 
 * When the last Pokemon is reached, i is set to 0 to start from the beginning.
 * @param {number} i The ID of the actual Pokemon.
 */

function nextPokemon(i) {
  {
    if (i < allLoadedPokemons.length - 1) {
      i++;
    } else {
      i = 0;
    }
    showDetailedPokemonScreen(i);
  }
}

/**
 * The function decrements the number of the PokemonID and renders the new Pokemon. 
 * When the first Pokemon is reached, i is set to the last Pokemon in the array.
 * @param {number} i The ID of the actual Pokemon.
 */

function lastPokemon(i) {
  if (i > 0) {
    i--;
  }
  else {
    i = allLoadedPokemons.length - 1;
  }
  showDetailedPokemonScreen(i);
}

/**
 * The function load Pokemon types from the API and is used to compare if the pokemon have one or two types.
 * Depending on the number of Pokemon types available the types are returned.
 * @param {number} currentPokemons the ID of the current Pokemon
 * @returns {string} the first type of the current Pokemon
 * 
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
 * @param { number } num The number/ID of the Pokemon
 * @param { number } size The number of zeros before the number of the Pokemon.
 * @returns {string} A Pokemon number with three zeros before the actual Pokemon ID.
 */

function padLeadingZeros(num, size) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function closeImg() {

  document.getElementById('black-screen').classList.add('d-none');
}