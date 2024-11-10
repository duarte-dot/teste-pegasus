const anunciosCards = () => {
  const comentariosSecao = document.getElementById("secao-buscas");
  const comentariosSecaoTitle = document.getElementById("secao-buscas-title");
  const buttonprev = document.querySelector(".prev");
  const buttonnext = document.querySelector(".next");
  const container = document.querySelector(".cards-container");
  let currentPosition = 0;
  const cardWidth = 800;

  function updateButtonVisibility() {
    if (window.innerWidth < 895) {
      buttonprev.style.display = "none";
      buttonnext.style.display = "none";
    } else {
      buttonprev.style.display = currentPosition > 0 ? "block" : "none";
      buttonnext.style.display = "block";
    }
  }

  updateButtonVisibility();

  window.addEventListener("resize", updateButtonVisibility);

  document.querySelectorAll(".anuncio-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".anuncio-card").forEach((card) => {
        card.classList.remove("selected-anuncio-card");
      });

      card.classList.add("selected-anuncio-card");

      comentariosSecao.style.display = "block";

      switch (index) {
        case 0:
          comentariosSecaoTitle.textContent = "As buscas que mais cresceram";
          break;
        case 1:
          comentariosSecaoTitle.textContent = "As buscas mais desejadas";
          break;
        case 2:
          comentariosSecaoTitle.textContent = "As tendências mais populares";
          break;
        default:
          comentariosSecao.textContent = "";
      }
    });
  });

  function moveCarousel(direction) {
    const maxScroll = container.scrollWidth - container.clientWidth;
    currentPosition += direction * cardWidth;
    if (currentPosition < 0) currentPosition = 0;
    if (currentPosition > maxScroll) currentPosition = maxScroll;

    updateButtonVisibility();

    container.scrollTo({
      left: currentPosition,
      behavior: "smooth",
    });
  }

  buttonprev.addEventListener("click", () => moveCarousel(-1));
  buttonnext.addEventListener("click", () => moveCarousel(1));
};

const openswitchscript = () => {
  function openModal() {
    document.getElementById("productModal").style.display = "flex";
  }

  function closeModal() {
    document.getElementById("productModal").style.display = "none";
  }

  document
    .getElementById("close-modal-button")
    .addEventListener("click", closeModal);

  document
    .getElementById("open-modal-button")
    .addEventListener("click", openModal);

  function changeImage(imageSrc) {
    document.getElementById("main-image").src = imageSrc;
  }

  const semanaElement = document.getElementById("semana");
  const horasElement = document.getElementById("horas");
  const imagem = document.getElementById("grafico");

  function trocarImagem(src) {
    imagem.src = src;
  }

  semanaElement.addEventListener("click", () => {
    semanaElement.classList.add("selected");
    horasElement.classList.remove("selected");
    trocarImagem("assets/images/semana.svg");
  });

  horasElement.addEventListener("click", () => {
    horasElement.classList.add("selected");
    semanaElement.classList.remove("selected");
    trocarImagem("assets/images/horas.svg");
  });

  const imagens = [
    "assets/images/produtos/tenis/tenis-real-1.png",
    "assets/images/produtos/tenis/tenis-real-2.png",
    "assets/images/produtos/tenis/tenis.png",
  ];

  let indiceAtual = 0;

  const imgProduto = document.getElementById("produto-img");
  const btnPrev = document.getElementById("prev-btn");
  const btnNext = document.getElementById("next-btn");

  function atualizarImagem() {
    imgProduto.src = imagens[indiceAtual];
  }

  btnPrev.addEventListener("click", () => {
    indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
    atualizarImagem();
  });

  btnNext.addEventListener("click", () => {
    indiceAtual = (indiceAtual + 1) % imagens.length;
    atualizarImagem();
  });
};

const testswitch = () => {
  const destacados = document.querySelector(".destacados");
  const favoritos = document.querySelector(".favoritos");
  const anunciosCardsContainer = document.getElementById(
    "anuncios-cards-container"
  );
  const secaoBuscas = document.getElementById("secao-buscas");
  const favoritosConteudo = document.getElementById("favoritos-conteudo");
  const categoriasContainer = document.getElementById("categorias-container");
  const iconeDestacados = document.getElementById("img-destacados");
  const textoDestacados = document.getElementsByClassName("texto-notificacoes");

  destacados.addEventListener("click", () => {
    destacados.classList.add("selected-switch");
    favoritos.classList.remove("selected-switch");

    anunciosCardsContainer.style.display = "block";
    secaoBuscas.style.display = "block";
    favoritosConteudo.style.display = "none";
    categoriasContainer.style.display = "block";
    iconeDestacados.style.filter = "none";
    textoDestacados[0].style.color = "#ff8a00";
  });

  favoritos.addEventListener("click", () => {
    favoritos.classList.add("selected-switch");
    destacados.classList.remove("selected-switch");

    anunciosCardsContainer.style.display = "none";
    secaoBuscas.style.display = "none";
    favoritosConteudo.style.display = "block";
    categoriasContainer.style.display = "none";
    iconeDestacados.style.filter = "grayscale(100%)";
    textoDestacados[0].style.color = "#11263C80";
  });
};

const catalog = () => {
  const cards = document.querySelectorAll(".card-info-catalog");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((c) => c.classList.remove("selected-catalog"));

      card.classList.add("selected-catalog");
    });
  });
};

document
  .addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");

    fetch("./pages/tendencias.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o conteúdo.");
        }
        return response.text();
      })
      .then((html) => {
        console.log("Div externa carregada com sucesso:");
        main.innerHTML = html;

        anunciosCards();
        testswitch();
        openswitchscript();

        const trendsIcon = document.getElementById("trends-icon");
        const catalogIcon = document.getElementById("catalog-icon");

        if (trendsIcon) {
          trendsIcon.addEventListener("click", () => {
            fetch("./pages/tendencias.html")
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Erro ao carregar a página");
                }
                return response.text();
              })
              .then((html) => {
                main.innerHTML = html;
                anunciosCards();
                testswitch();
                openswitchscript();
              })
              .catch((error) => {
                console.error("Erro:", error);
                main.innerHTML =
                  "<p>Erro ao carregar a página de tendências.</p>";
              });
          });
        }

        if (catalogIcon) {
          catalogIcon.addEventListener("click", () => {
            fetch("./pages/catalogo.html")
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Erro ao carregar a página");
                }
                return response.text();
              })
              .then((html) => {
                main.innerHTML = html;
                catalog();
              })
              .catch((error) => {
                console.error("Erro:", error);
                main.innerHTML =
                  "<p>Erro ao carregar a página de catálogo.</p>";
              });
          });
        }
      });
  })
  .catch((error) => {
    console.error("Erro ao carregar a div externa:", error);
  });
