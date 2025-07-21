import { getIdFromUri } from "../../utils/getIdFromUri.js";
import { isItemFavorite } from "../../utils/localStorage.js";
export class RenderCharacters {
    constructor(container) {
        this.container = container;
    }
    renderCharacters(characters) {
        const containerId = document.getElementById("container-details-characters");
        containerId.dataset.id = characters.id.toString();
        const div = document.getElementById("characters-image");
        const img = div === null || div === void 0 ? void 0 : div.querySelector("img");
        img === null || img === void 0 ? void 0 : img.classList.add('container-image');
        if (img && characters.thumbnail.path && characters.thumbnail.extension)
            img.src = `${characters.thumbnail.path}.${characters.thumbnail.extension}`;
        const btnCardfavorite = document.createElement("button");
        const imageBtnCardFavorite = document.createElement('img');
        imageBtnCardFavorite.classList.add('image-btn-card');
        imageBtnCardFavorite.src = '../img/suit-heart.svg';
        btnCardfavorite.classList.add("favorite");
        if (isItemFavorite("favorite", characters.currentType, characters.id.toString())) {
            imageBtnCardFavorite.src = '../img/suit-heart-fill.svg';
        }
        else {
            imageBtnCardFavorite.src = '../img/suit-heart.svg';
        }
        const name = document.getElementById("characters-name");
        if (name)
            name.textContent = characters.name || "Nome Indisponível";
        const description = document.getElementById("characters-description");
        if (description)
            description.textContent =
                characters.description || "Descrição indisponível";
        const containerSeries = document.getElementById("link-series");
        if (containerSeries) {
            const items = characters.series.items;
            if (items && items.length > 0) {
                containerSeries.innerHTML = items
                    .map((series) => {
                    const id = getIdFromUri(series.resourceURI);
                    return `<li><a href="series.html?type=series&id=${id}">${series.name}</a></li>`;
                })
                    .join("");
            }
            else {
                containerSeries.innerHTML = "<li>Series indisponíveis</li>";
            }
        }
        const containerComics = document.getElementById("link-comics");
        if (containerComics) {
            const items = characters.comics.items;
            if (items && items.length > 0) {
                containerComics.innerHTML = items
                    .map((comics) => {
                    const id = getIdFromUri(comics.resourceURI);
                    return `<li><a href="comics.html?type=comics&id=${id}">${comics.name}</a></li>`;
                })
                    .join("");
            }
            else {
                containerComics.innerHTML = "<li>Comics indisponíveis</li>";
            }
        }
        btnCardfavorite.appendChild(imageBtnCardFavorite);
        containerId.appendChild(btnCardfavorite);
    }
}
