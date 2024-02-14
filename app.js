const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const fetchPokemon = () => {
   const pokemonPromises = generatePokemonPromises()

  Promise.all(pokemonPromises)
   .then(pokemons => {
       return pokemons.reduce((accumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        console.log (types);
        
        if(types[0] == "grass"){
            types[0] = "Pastel";
        }
        if(types[1] == "grass"){
            types[1] = "Coxinha";
        }
             
        accumulator += `
          <li class="card">
          <img class="card-image" alt="${name}"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(' | ')}</p>
          </li>
          `
          return accumulator
       }, '')
   })
   .then(pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
       ul.innerHTML = pokemons
})

}

fetchPokemon()