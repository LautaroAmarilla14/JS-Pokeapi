//https://pokeapi.co/api/v2/pokemon/2//

const requestPokemon = async (pokemon) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const data = await response.json();
        return data
        
    } catch (error) {
        console.log(error);
        
        
    }
};


const form = document.getElementById ("pokemonForm")
const input = document.getElementById("numberInput")
const resultcontainer = document.querySelector(".result-container")

const PokemonTemplate = (pokemonData) => {
    return `
        <div class="pokemon-card">
            <img class="pokemon-image" src="${pokemonData.Sprites}" alt="${pokemonData.Name}">
            <h3 class="pokemon-name">${pokemonData.Name}</h3>
            <p class="pokemon-type">Tipo: ${pokemonData.Type}</p>
            <p class="pokemon-weight">Peso: ${pokemonData.Weight / 10} kg</p>
            <p class="pokemon-height">Altura: ${pokemonData.Height / 10} m</p>
        </div>
    `;
};

const RenderPokemon = (pokemonData) => {
    resultcontainer.innerHTML = PokemonTemplate(pokemonData);
};


const invalidInput = (pokemon) => {
    return !pokemon || !pokemon.name;
}

const getpokemondata = (data) => {
    return{
        Name: data.name,
        Height: data.height,
        Weight: data.weight,
        Sprites: data.sprites.front_default,
        id: data.id,
        Type: data.types.map(type => type.type.name).join(', '),
    }
}



const searchPokemon = async (e) => {
e.preventDefault();

const InputPokemon = input.value.trim().toLowerCase();

if(InputPokemon === ""){
    alert("Por favor, ingrese un número o un Pokémon");
    return;
}

const fetchedpokemon = await requestPokemon(InputPokemon);

if(invalidInput(fetchedpokemon)){
    alert("Ese Pokémon no existe, hay desde 1 a 1025 Pokemones!");
    return;
}
const pokemonData = getpokemondata(fetchedpokemon);
    RenderPokemon(pokemonData);

console.log(fetchedpokemon);

console.log(getpokemondata(fetchedpokemon));


}

const init =() => {
form.addEventListener("submit", searchPokemon)
};
init()





