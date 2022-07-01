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
 * This variable represents the number or the name of the Pokemon which has been clicked.
 *  @type {numer|string}
 */

let currentPokemon;

/**
 * The variable prevents the user from scrolling down during the search function.
 * @type {boolean} is activated or deactivated during the search function for Pokemon.
 */
let scroll = true;

/**
 * The variable is altered to show if the window changes in its width. 
 * @type {boolean}
*/

let changeWindow = false;

/**
 * This function loads and renders the pokemon in an array when the side is loaded
 */
async function init() {
  await loadPokemonInArray();
  await renderPokemon();
}

/* id="typedtext" */

/**
 * Ask for Pokemon from Poke API 
 */
async function searchPokemon() {
  scroll = false;
  await getPokemonByName();
  await showDetailedPokemonScreen(currentPokemon);
  await loadPokemonInArray();
  scroll = true;
}


/**
 * This function searches for Pokemon with the given name or ID in the input field.
 * The pokemon will be loaded in the detailed Pokemon screen.
 */
async function getPokemonByName() {
  onePokemonScreen = false;
  let pokemonName = document.getElementById('pokedexSearch').value;
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  let responsePokemon = await fetch(url);
  let pokemon = await responsePokemon.json();
  numberOfLoadedPokemons = pokemon['id'];
  currentPokemon = Number(pokemon['id'] - 1);
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
 * The function asks for a pokemon from PokeAPI.
 * @param {number} pokemonId PokemonId that is asked for.
 * @returns Returns the ID of a Pokemon.
 */

async function getPokemonById(pokemonId) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  let responsePokemon = await fetch(url);
  let pokemon = await responsePokemon.json();
  return pokemon;
}

/**
 * The function renders the Pokemon Cards seen on the screen.
 * It converts the names of Pokemon to upper case and inserts different colors depending on the type of the corresponding Pokemon.
 * Also it loads pictures of the Pokemon from the loadedPokemon array.
 */

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

/**
 * The event listener checks the width of the screen when its altered.
 * @param {callback} checkWindowResize Renders the detailed Pokemon information while changing the window size. 
 */
window.addEventListener("resize", checkWindowResize);

/**
 * The function checks the window size and shows the correct detailed Pokemon information.
 */

function checkWindowResize() {
  console.log(window.innerWidth)
  if (onePokemonScreen) {
    changeWindow = true;
    showDetailedPokemonScreen(currentPokemon);
    changeWindow = false;
  }
}

/** The function opens the detailed Pokemon screen on the left side of the screen*/

async function showDetailedPokemonScreen(i) {
  currentPokemon = i;
  let onePokemon = document.getElementById('onePokemon');
  let allPokemon = document.getElementById('allPokemon');
  if (!onePokemonScreen || changeWindow) {
    if (window.innerWidth > 700) {
      setTimeout(() => {
        onePokemon.classList.add('detailed-pokemon-on');
        allPokemon.classList.add('all-pokemon-menu-on');
        allPokemon.classList.remove('d-none');
      }, 500);
      setTimeout(() => {
        createOnePokemonScreen(i, onePokemon)
      }, 3500);
    }
    if (window.innerWidth <= 700) {
      createOnePokemonScreen(i, onePokemon);
      allPokemon.classList.add('d-none');
      onePokemon.classList.add('detailed-pokemon-on');
    }
    onePokemonScreen = true;
  }
}

function closeDetailedPokemonScreen() {
  currentPokemon;
  let onePokemon = document.getElementById('onePokemon');
  let allPokemon = document.getElementById('allPokemon');
  if (onePokemonScreen) {
    if (window.innerWidth > 700) {
      onePokemon.classList.remove('detailed-pokemon-on');
      onePokemon.classList.add('detailed-pokemon-off');
      setTimeout(() => {
        allPokemon.classList.remove('all-pokemon-menu-on');
        onePokemonScreen = false;
      }, 2500);
      setTimeout(() => {
        onePokemon.innerHTML = '';
        onePokemon.classList.remove('detailed-pokemon-off');
      }, 3500);
    }
    if (window.innerWidth <= 700) {
      onePokemon.innerHTML = '';
      allPokemon.classList.remove('d-none');
      onePokemon.classList.remove('detailed-pokemon-on');
      onePokemonScreen = false;
    }
  }
}
/** */
function createOnePokemonScreen(i, onePokemon) {
  let currentPokemon = allLoadedPokemons[i];
  [typeOne, typeTwo] = comparePokemonType(currentPokemon);
  onePokemon.innerHTML = renderDetailedPokemonScreen(currentPokemon, i, typeOne, typeTwo)
  renderPokemonInformation(currentPokemon, i);
  insertCloseBtn();
  insertCross(i);
  showPokemonTypeOnePokemon(currentPokemon, i);
}
/** 
 * The function renders the Pokemon pictures in the detailed Pokemon screen. 
*/

function renderDetailedPokemonScreen(currentPokemon, i, typeOne, typeTwo) {
  return `  <div class="one-pokemon-screen">
  <div class="outer-polygon">
      <div class="border-one-pokemon">
          <div class="one-pokemon-header"
              style="background-image: linear-gradient(to bottom, var(--${typeOne}) 40%, var(--${typeTwo}));">
              <h2>${upperCase(currentPokemon['name'])} # ${padLeadingZeros(currentPokemon['id'], 3)}</h2>
              <div><img id="bigImg" class="pokemon-img big-img" src="${currentPokemon['sprites']['front_default']}"></div>
              <div class="align-items" id="onePokemonType-${i}"></div>
          </div>
      </div>
  </div>
  <div class="one-pokemon-details">
      <div class="close-details">
          <div class="details-container">  
              <div id="abilities-${i}"></div>
              <div id="weight-${i}"></div>
              <div id="height-${i}"></div>
              <div>
              <table class="stats-name" id="statsName"></table>
              </div>
          </div>
      <div class="close-btn" id="closeBtn">
      </div>
  </div>
  </div>
  <div class="cross-container" id="crossPosition"></div>
  </div>      
         `;
}

function bigImg() {


  document.getElementById('bigImg').innerHTML;
}

/** */
function renderPokemonInformation(currentPokemon, i) {
  getHeight(currentPokemon, i);
  getWeight(currentPokemon, i);
  getAbilities(currentPokemon, i);
  getPokemonStats(currentPokemon, i);
}
/** */
function getHeight(currentPokemon, i) {
  let height = document.getElementById(`height-${i}`);
  let text = `<div>Height: ${currentPokemon['height']}</div>`;
  height.insertAdjacentHTML('afterbegin', text);
};
/** */
function getWeight(currentPokemon, i) {
  let weight = document.getElementById(`weight-${i}`);
  let text = `<div>Weight: ${currentPokemon['weight']}</div>`;
  weight.insertAdjacentHTML('afterbegin', text);
};
/** */
async function getAbilities(currentPokemon, i) {
  let abilities = document.getElementById(`abilities-${i}`);
  let pokemonAbility = await getPokemonInformation(currentPokemon, 'abilities', 'ability', 'name');
  console.log(pokemonAbility)
  let text = `<div>Abilities: ${pokemonAbility}</div>`;
  abilities.insertAdjacentHTML('afterbegin', text);
};

/** */

async function getPokemonStats(currentPokemon, i) {

  for (let j = 0; j < currentPokemon['stats'].length; j++) {
    const stat = currentPokemon['stats'][j]['stat']['name'];
    const base_stat = currentPokemon['stats'][j]['base_stat'];
    document.getElementById('statsName').innerHTML += `
    <tr>
        <td><div><nobr>${upperCase(stat)}:</nobr></div></td>
        <td><div class="progress-bar" style="--width:${base_stat}" data-label="${base_stat}"> </div></td>
    </tr>
   
 `;
    console.log(stat);
    console.log(base_stat);
  }
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
 * The function generates the yellow triangle to close the detailed Pokemon screen.
 */

function insertCloseBtn() {
  let closeBtn = document.getElementById('closeBtn');
  let text = `<button class="close-btn-pic" onclick="closeDetailedPokemonScreen()"><img src="PNG/close.png"></button>`
  closeBtn.insertAdjacentHTML('afterbegin', text)
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

/**
 * 
 * @param {number} currentPokemons The current Pokemon.
 * @param {number} i The number of the Pokemon depending on the current Pokemon.
 * @returns The types of the current Pokemon
 */

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
  if (window.scrollY + window.innerHeight >= document.body.clientHeight && scroll == true) {
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
    currentPokemons = await getPokemonById(j);
    allLoadedPokemons.push(currentPokemons);
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
    createOnePokemonScreen(i, onePokemon);
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
  createOnePokemonScreen(i, onePokemon);
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



