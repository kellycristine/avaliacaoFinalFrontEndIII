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
    
      <a href="../../detalhes.html?id=${personagem.id}" class="card-link" data-id="${personagem.id}">
      <div class="card">
        <div class="row">
          <div class="col-md-4">
              <img src="${personagem.image}" alt="" class="img-fluid" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h1 class="card-title">${personagem.name}</h1>
                <div class="status mt-4">
                  <div class="${personagem.status}"></div>
                    <h5 class="card-subtitle">${personagem.status} - ${personagem.species}</h5>
                  </div>
                <div>
                <h4 class="my-3">Última localização conhecida:</h4>
                    <p class="card-text">${personagem.location.name}</p>
        </div>
        <div>
          <h4 class="my-3">Visto pela última vez em:</h4>
          <p class="card-text">...</p>
        </div>
      </div>
    </div>
    
  </div>
  </a>

      `;
    });
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

  function nextPage1() {
    currentPage++;
    loadCharacters(currentPage);
  }
  
  function prevPage1() {
    if (currentPage > 1) {
      currentPage--;
      loadCharacters(currentPage);
    }
}

document.querySelector("#nextPageBtn").addEventListener("click", nextPage);
document.querySelector("#prevPageBtn").addEventListener("click", prevPage);
document.querySelector("#nextPageBtn1").addEventListener("click", nextPage1);
document.querySelector("#prevPageBtn1").addEventListener("click", prevPage1);

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
document.querySelector("#nextPageBtn1").addEventListener("click", () => {
  currentPage++;
  loadCharacters(currentPage);
});

document.querySelector("#prevPageBtn1").addEventListener("click", () => {
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
     axios.get(`${API_characters}/${characterId}`).then(function (response) {
        characterContainer = response.data;
       const elementoDetalhes = document.querySelector("#elementoDetalhes");
       elementoDetalhes.innerHTML = `
         // ... Conteúdo com as informações detalhadas ... 
      `;
     });
  }

});

const apiUrl = "https://rickandmortyapi.com/api/";
const campoBusca = document.getElementById("campoBusca");
const resultado = document.getElementById("resultado");
const opcoesBusca = document.getElementById("opcoesBusca");

axios.get(apiUrl + "character")
    .then(response => {
        const quantidadePersonagens = response.data.info.count;
        const numPer = document.getElementById('nper')
        numPer.innerHTML=`${quantidadePersonagens}`
    })
    .catch(error => {
        console.error("Erro ao obter quantidade de personagens:", error);
    });

axios.get(apiUrl + "location")
    .then(response => {
        const quantidadeLocalizacoes = response.data.info.count;
        const nloc = document.getElementById('nloc')
        nloc.innerHTML = `${quantidadeLocalizacoes}`
    })
    .catch(error => {
        console.error("Erro ao obter quantidade de localizações:", error);
    });

    axios.get(apiUrl + "episode")
    .then(response => {
        const quantidadeEpisodios = response.data.info.count;
        const nep = document.getElementById('nep')
        nep.innerHTML = `${quantidadeEpisodios}`
    })
    .catch(error => {
        console.error("Erro ao obter quantidade de episódios:", error);
    });


async function buscarNomeUltimoEpisodio(urlEpisodio) {
  try {
    const response = await axios.get(urlEpisodio);
    const ultimoEpisodio = response.data;
    return ultimoEpisodio.name;
  } catch (error) {
    console.error("Erro ao obter detalhes do último episódio:", error);
    return "Erro ao obter detalhes do episódio";
  }
}

async function mostrarPersonagem(personagem) {
  const ultimoEpisodioName = await buscarNomeUltimoEpisodio(
    personagem.episode[personagem.episode.length - 1]
  );

  resultado.innerHTML = `
        <h2>${personagem.name}</h2>
        <p>${personagem.status} - ${personagem.species}</p>
        <p>Última localização conhecida:<br>${personagem.location.name}</p>
        <p>Visto pela última vez em:<br>${ultimoEpisodioName}</p>
        <img src="${personagem.image}" alt="${personagem.name}">
    `;
}

function buscarPersonagem(nome) {
  axios.get(apiUrl + "character", {
      params: { name: nome },
    })
    .then((response) => {
      const personagens = response.data.results;

      if (personagens.length > 0) {
        mostrarPersonagem(personagens[0]);
      } else {
        resultado.innerHTML = "Personagem não encontrado.";
      }

      exibirOpcoesBusca(personagens);
    })
    .catch((error) => {
      console.error("Erro ao buscar personagem:", error);
      resultado.innerHTML = "Ocorreu um erro ao buscar o personagem.";
    });
}

function exibirOpcoesBusca(personagens) {
  opcoesBusca.innerHTML = "";
  personagens.forEach((personagem) => {
    const opcao = document.createElement("div");
    opcao.textContent = personagem.name;
    opcao.classList.add("opcao-busca");
    opcao.addEventListener("click", () => {
      campoBusca.value = personagem.name;
      buscarPersonagem(personagem.name);
    });
    opcoesBusca.appendChild(opcao);
  });
}

campoBusca.addEventListener("input", () => {
  const nomePersonagem = campoBusca.value.trim();
  if (nomePersonagem !== "") {
    buscarPersonagem(nomePersonagem);
  } else {
    opcoesBusca.innerHTML = "";
    resultado.innerHTML = "";
  }
});
