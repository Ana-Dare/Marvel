export class Renderer {
  constructor(container, tipoAtual) {
    this.container = container;
    this.tipoAtual = tipoAtual;
  }
  render(item) {
    const cards = document.createElement("div");
    cards.classList.add("item-container");
    cards.dataset.id = item.id.toString();
    const titulo = document.createElement("h3");
    titulo.classList.add("titulo-item-container");
    titulo.textContent =
      item.currentType === "characters"
        ? item.name || "Nome indisponível."
        : item.title || "Título indisponível.";
    const img = document.createElement("img");
    img.classList.add("img-item-container");
    if (item.thumbnail.path && item.thumbnail.extension) {
      img.src = `${item.thumbnail.path}.${item.thumbnail.extension}`;
    }
    img.alt = titulo.textContent || "Imagem";
    img.width = 100;
    cards.appendChild(titulo);
    cards.appendChild(img);
    this.container.appendChild(cards);
  }
  limpar() {
    this.container.innerHTML = "";
  }
  mudarTipo(novoTipo) {
    this.tipoAtual = novoTipo;
  }
}
