import { DataApi } from "../../interfaces/requestInterface.js";
import { ContentType } from "../../interfaces/requestInterface.js";
import { isItemFavorite } from "../../utils/localStorage.js";

export class Renderer {
  constructor(
    protected container: HTMLElement,
    protected tipoAtual: ContentType,
  ) {}

  public render(item: DataApi) {
    const cards = document.createElement("div");
    cards.classList.add("item-container");
    cards.dataset.id = item.id.toString();
    cards.dataset.type = item.currentType;
    cards.dataset.name = item.name || "";
    cards.dataset.title = item.title || "";
    cards.dataset.thumbnailPath = item.thumbnail?.path || "";
    cards.dataset.thumbnailExtension = item.thumbnail?.extension || "";
    const titulo = document.createElement("h3");
    titulo.classList.add("titulo-item-container");
    titulo.textContent =
      item.currentType === "characters"
        ? item.name || "Nome indisponível."
        : item.title || "Título indisponível.";
    const btnCardfavorite = document.createElement("button");
    btnCardfavorite.classList.add("favorite");
    if(isItemFavorite('favorite', item.currentType, item.id.toString())) {
      btnCardfavorite.classList.add('active');
    }
    const img = document.createElement("img");
    img.classList.add("img-item-container");
    if (item.thumbnail.path && item.thumbnail.extension) {
      img.src = `${item.thumbnail.path}.${item.thumbnail.extension}`;
    }
    img.alt = titulo.textContent || "Imagem";
    img.width = 100;

    //  adiciona ou tirar corzinha do botao conforme resposta do getFavoriteItem

    cards.appendChild(btnCardfavorite);
    cards.appendChild(titulo);
    cards.appendChild(img);
    this.container.appendChild(cards);
    console.log(item);
  }

  private getFavoriteItem(id: string): boolean {
    let dataLocalStorage = [];
    try {
      dataLocalStorage = JSON.parse(localStorage.getItem("characters") || "");
    } catch (error) {
      return false;
    }

    const characters: Array<{}> = dataLocalStorage;
    return characters.includes(id);
  }

  public limpar() {
    this.container.innerHTML = "";
  }
  public mudarTipo(novoTipo: ContentType) {
    this.tipoAtual = novoTipo;
  }
}
