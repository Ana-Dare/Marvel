import { isItemFavorite } from "../../utils/localStorage.js";
export class RenderitemFavorites {
    constructor(container) {
        this.container = container;
    }
    renderitemFavorites(type) {
        this.container.innerHTML = '';
        const itemFavoriteString = localStorage.getItem('favorite') || '{}';
        let itemFavorite = {};
        try {
            itemFavorite = JSON.parse(itemFavoriteString);
        }
        catch (error) {
            console.error('Erro ao converter favoritos:', error);
        }
        const items = itemFavorite[type];
        if (!items || Object.keys(items).length === 0) {
            this.container.innerHTML = "Não há itens salvos nessa categoria";
        }
        switch (type) {
            case "characters":
            case "comics":
            case "series":
                for (const id in items) {
                    const item = items[id];
                    const card = document.createElement("div");
                    card.classList.add("item-container");
                    card.dataset.id = id;
                    card.dataset.type = type;
                    const title = document.createElement("h3");
                    title.classList.add("titulo-item-container");
                    title.textContent = type === "characters"
                        ? item.name || "Nome indisponível"
                        : item.title || "Título indisponível";
                    const img = document.createElement("img");
                    img.classList.add("img-item-container");
                    img.src = item.imagem || "";
                    img.alt = title.textContent || "Imagem";
                    img.width = 100;
                    const btnCardFavorite = document.createElement("button");
                    btnCardFavorite.classList.add("favorite");
                    if (isItemFavorite("favorite", type, id)) {
                        btnCardFavorite.classList.add("active");
                    }
                    card.appendChild(btnCardFavorite);
                    card.appendChild(title);
                    card.appendChild(img);
                    this.container.appendChild(card);
                }
                break;
            default:
                this.container.innerHTML = "Tipo inválido.";
        }
    }
}
