import { isItemFavorite } from "../../utils/localStorage.js";
export class Renderer {
    constructor(container, currentType) {
        this.container = container;
        this.currentType = currentType;
    }
    render(item) {
        var _a, _b;
        const cards = document.createElement("div");
        cards.classList.add("item-container");
        cards.dataset.id = item.id.toString();
        cards.dataset.type = item.currentType;
        cards.dataset.name = item.name || "";
        cards.dataset.title = item.title || "";
        cards.dataset.thumbnailPath = ((_a = item.thumbnail) === null || _a === void 0 ? void 0 : _a.path) || "";
        cards.dataset.thumbnailExtension = ((_b = item.thumbnail) === null || _b === void 0 ? void 0 : _b.extension) || "";
        const titulo = document.createElement("h3");
        titulo.classList.add("titulo-item-container");
        titulo.textContent =
            item.currentType === "characters"
                ? (item.name || "Nome indisponível.").toUpperCase()
                : (item.title || "Título indisponível.").toUpperCase();
        const btnCardfavorite = document.createElement("button");
        const imageBtnCardFavorite = document.createElement("img");
        imageBtnCardFavorite.classList.add("image-btn-card");
        imageBtnCardFavorite.src = "../img/suit-heart.svg";
        btnCardfavorite.classList.add("favorite");
        if (isItemFavorite("favorite", item.currentType, item.id.toString())) {
            imageBtnCardFavorite.src = "../img/suit-heart-fill.svg";
        }
        else {
            imageBtnCardFavorite.src = "../img/suit-heart.svg";
        }
        const img = document.createElement("img");
        img.classList.add("img-item-container");
        if (item.thumbnail.path && item.thumbnail.extension) {
            img.src = `${item.thumbnail.path}.${item.thumbnail.extension}`;
        }
        img.alt = titulo.textContent || "Imagem";
        img.width = 100;
        const elements = document.createElement("div");
        elements.classList.add("elements-title-button");
        cards.appendChild(img);
        btnCardfavorite.appendChild(imageBtnCardFavorite);
        elements.appendChild(titulo);
        elements.appendChild(btnCardfavorite);
        cards.appendChild(elements);
        this.container.appendChild(cards);
    }
    toClean() {
        this.container.innerHTML = "";
    }
    changeType(newType) {
        this.currentType = newType;
    }
}
