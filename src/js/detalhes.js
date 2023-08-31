const characters = document.querySelector("#characters");
const totalCharacters = document.querySelector("#personagens");
const totalLocations = document.querySelector("#localizacoes");
const totalEpisodes = document.querySelector("#episodios");
const API_characters = "https://rickandmortyapi.com/api/character";
const API_locations = "https://rickandmortyapi.com/api/location";
const API_episodes = "https://rickandmortyapi.com/api/episode";

document.addEventListener("DOMContentLoaded", () => {
  const characterDetailsContainer = document.querySelector("#characterDetailsContainer");

  // Obtém o ID do personagem da URL da página
  const urlParams = new URLSearchParams(window.location.search);
  const characterId = urlParams.get("id");

  // URL da API para obter os detalhes do personagem
  const API_character = `https://rickandmortyapi.com/api/character/${characterId}`;

  // Função para carregar os detalhes do personagem
  function loadCharacterDetails() {
    axios.get(API_character).then(function (response) {
      const character = response.data;

      // Preenche o conteúdo dos detalhes do personagem
      characterDetailsContainer.innerHTML = `
        <div class="card text-align-center">
          <div class="card-body">
          <h1 class="card-title my-2">${character.name}</h1>
          <img src="${character.image}" alt="${character.name}" class="img-fluid">
          <div class="status mt-5">
          <div class="${character.status}"></div>
          <h4 class="card-subtitle ">${character.status} - ${character.species}</h4>
          </div>
          </div>
          <h4>Gênero: ${character.gender}</h4>
          <h4>Última localização conhecida:</h4>
                    <p class="card-text">${character.location.name}</p>
        
          <!-- ... Adicione mais informações dos detalhes do personagem aqui ... -->
        </div>
          </div>
      `;
    });
  }

  // Carrega os detalhes do personagem ao carregar a página
  loadCharacterDetails();
});

axios.get(API_locations).then(function (response) {
  totalLocations.innerHTML = response.data.info.count;
  console.log(response);
});

axios.get(API_episodes).then(function (response) {
  totalEpisodes.innerHTML = response.data.info.count;
  console.log(response);
});
