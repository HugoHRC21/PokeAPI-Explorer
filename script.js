const searchBtn = document.getElementById("searchBtn");
const pokemonInput = document.getElementById("pokemonInput");
const pokemonCard = document.getElementById("pokemonCard");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonName = document.getElementById("pokemonName");
const pokemonType = document.getElementById("pokemonType");
const pokemonWeight = document.getElementById("pokemonWeight");

searchBtn.addEventListener("click", () => {
  searchPokemon();
});

pokemonInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchPokemon();
  }
});

function searchPokemon() {
  const query = pokemonInput.value.toLowerCase().trim();
  if (query) {
    fetchPokemon(query);
  }
}


function fetchPokemon(query) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Pokémon no encontrado");
      }
      return response.json();
    })
    .then(data => {
      pokemonImage.src = data.sprites.front_default;
      pokemonName.textContent = data.name.toUpperCase();
      pokemonType.textContent = data.types.map(t => t.type.name).join(", ");
      pokemonWeight.textContent = data.weight / 10; // hectogramos a kg
      pokemonCard.classList.remove("hidden");
    })
    .catch(error => {
      alert(error.message);
      pokemonCard.classList.add("hidden");
    });
}
