document.addEventListener("DOMContentLoaded", () => {
  const characterContainer = document.querySelector("#characterContainer");
  const backButton = document.querySelector("#backButton");
  let selectedCharacterId = null;

  const characters = document.querySelector("#characters");
const totalCharacters = document.querySelector("#personagens");
const totalLocations = document.querySelector("#localizacoes");
const totalEpisodes = document.querySelector("#episodios");
const API_characters = "https://rickandmortyapi.com/api/character";
const API_locations = "https://rickandmortyapi.com/api/location";
const API_episodes = "https://rickandmortyapi.com/api/episode";

let currentPage = 1;

function loadCharacters(page) {
  axios.get(`${API_characters}?page=${page}`).then(function (response) {
  
    characters.innerHTML = "";

  const personagens = response.data.results;
  const nextPage = response.data.info.page;

  totalCharacters.innerHTML = response.data.info.count;

  console.log(nextPage);
  console.log(response);
  console.log(personagens);
    
  personagens.forEach((personagem) => {
    
    characters.innerHTML += `
      <a href="detalhes.html class="card" data-id=${personagem.id}">
    <div class="card">
  <div class="row">
    <div class="col-md-4">
      <img src="${personagem.image}" alt="" class="img-fluid" />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title">${personagem.name}</h3>
        <div class="status">
          <div class="${personagem.status}"></div>
          <h5 class="card-subtitle">${personagem.status} - ${personagem.species}</h5>
        </div>
        <div>
          <h4>Última localização conhecida:</h4>
          <p class="card-text">${personagem.location.name}</p>
        </div>
        <div>
          <h4>Visto pela última vez em:</h4>
          <p class="card-text">...</p>
        </div>
      </div>
    </div>
    
  </div>
</div></a>
      `
    })
    
    
});
}


axios.get(API_locations).then(function (response) {
  totalLocations.innerHTML = response.data.info.count;
  console.log(response);
});

axios.get(API_episodes).then(function (response) {
  totalEpisodes.innerHTML = response.data.info.count;
  console.log(response);
});

loadCharacters(currentPage);

function nextPage() {
  currentPage++;
  loadCharacters(currentPage);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    loadCharacters(currentPage);
  }
}

document.querySelector("#nextPageBtn").addEventListener("click", nextPage);
document.querySelector("#prevPageBtn").addEventListener("click", prevPage);

  // Botão para voltar à visualização anterior
  backButton.addEventListener("click", () => {
    const selectedCard = document.querySelector(".card.selected");
    if (selectedCard) {
      selectedCard.classList.remove("selected");
      const otherCards = document.querySelectorAll(".card:not(.selected)");
      otherCards.forEach((otherCard) => {
        otherCard.style.transform = "";
      });
      backButton.style.display = "none";
      selectedCharacterId = null;
    }
  });

  // Carregar os personagens na página inicial
  loadCharacters(currentPage);
});

// Código para carregar os personagens e lidar com a paginação
const characters = document.querySelector("#characters");
const totalCharacters = document.querySelector("#personagens");
const API_characters = "https://rickandmortyapi.com/api/character";
let currentPage = 1;

function loadCharacters(page) {
  axios.get(`${API_characters}?page=${page}`).then(function (response) {
    const personagens = response.data.results;
    totalCharacters.innerHTML = response.data.info.count;
    
    characters.innerHTML = "";

    personagens.forEach((personagem) => {
      characters.innerHTML += `
        <a href="#" class="card">
          <!-- ... Conteúdo do card ... -->
        </a>
      `;
    });
  });
}

document.querySelector("#nextPageBtn").addEventListener("click", () => {
  currentPage++;
  loadCharacters(currentPage);
});

document.querySelector("#prevPageBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadCharacters(currentPage);
  }
});

// Código para lidar com o clique nos cards
characters.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".card");
  if (clickedCard) {
    clickedCard.classList.add("selected");

    const otherCards = document.querySelectorAll(".card:not(.selected)");
    otherCards.forEach((otherCard) => {
      otherCard.style.transform = "translateX(-100%)";
    });

    backButton.style.display = "block";

    // Você pode usar o "data-id" ou outro atributo para identificar o personagem
    const characterId = clickedCard.getAttribute("data-id");
    selectedCharacterId = characterId;

    // Agora você pode fazer uma nova requisição para obter os detalhes do personagem usando o ID
    // Exiba as informações detalhadas em algum elemento na página, por exemplo, um <div>
    // Lembre-se de substituir "elementoDetalhes" pelo seletor do elemento onde você deseja exibir as informações
    // axios.get(`${API_characters}/${characterId}`).then(function (response) {
    //   const characterDetails = response.data;
    //   const elementoDetalhes = document.querySelector("#elementoDetalhes");
    //   elementoDetalhes.innerHTML = `
    //     <!-- ... Conteúdo com as informações detalhadas ... -->
    //   `;
    // });
  }

});
