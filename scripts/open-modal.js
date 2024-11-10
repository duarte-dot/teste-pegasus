function openModal() {
  document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

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
