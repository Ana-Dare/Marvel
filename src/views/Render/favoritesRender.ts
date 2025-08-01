import { CurrentTypeInterface } from "../../interfaces/requestInterface.js";
import { isItemFavorite } from "../../utils/localStorage.js";

export class RenderitemFavorites {
  constructor(public container: HTMLElement) {}

  public renderitemFavorites(
    type: CurrentTypeInterface,
    filtered?: Record<string, { name: string; title: string; imagem: string }>
  ) {
    this.container.innerHTML = "";

    let items: Record<string, { name: string; title: string; imagem: string }> =
      {};

    if (filtered) {
      items = filtered;
      if (!items || Object.keys(items).length === 0) {
        this.container.innerHTML = `
        <div class='no-more-results'> 
          Nenhum resultado encontrado para esse termo.
        </div>`;
        return;
      }
    } else {
      const itemFavoriteString = localStorage.getItem("favorite") || "{}";
      let itemFavorite: Record<
        string,
        Record<string, { name: string; title: string; imagem: string }>
      > = {};
      try {
        itemFavorite = JSON.parse(itemFavoriteString);
      } catch (error) {
        console.error("Erro ao converter favoritos:", error);
      }
      items = itemFavorite[type] || {};
    }

    if (!items || Object.keys(items).length === 0) {
      this.container.innerHTML = `
        <div class='no-more-results'> 
          Não há itens salvos nessa categoria.
        </div>`;
      return;
    }

    switch (type) {
      case "characters":
      case "comics":
      case "series":
        for (const id in items) {
          const item = items[id];
          const card = document.createElement("div") as HTMLDivElement;
            card.classList.add("item-container");
            card.dataset.id = id;
            card.dataset.type = type;

            const title = document.createElement("h3");
            title.classList.add("titulo-item-container");
            title.textContent =
              type === "characters"
                ? (item.name || "Nome indisponível").toUpperCase()
                : (item.title || "Título indisponível").toUpperCase();

            const img = document.createElement("img");
            img.classList.add("img-item-container");
            img.src = item.imagem || "";
            img.alt = title.textContent || "Imagem";
            img.width = 100;

            const btnCardFavorite = document.createElement("button");
            btnCardFavorite.classList.add("favorite");
            const imageBtnCardFavorite = document.createElement(
              "img"
            ) as HTMLImageElement;
            imageBtnCardFavorite.classList.add("image-btn-card");
            imageBtnCardFavorite.src = imageBtnCardFavorite.src =
              "../img/suit-heart-fill.svg";

            if (isItemFavorite("favorite", type, id)) {
              imageBtnCardFavorite.src = "../img/suit-heart-fill.svg";
            }
            const elements = document.createElement("div");
            elements.classList.add("elements-title-button");

            card.appendChild(img);
            btnCardFavorite.appendChild(imageBtnCardFavorite);
            elements.appendChild(title);
            elements.appendChild(btnCardFavorite);
            card.appendChild(elements);
            this.container.appendChild(card);
        }
        break;
      default:
        this.container.innerHTML = "Tipo inválido.";
    }
  }
}
