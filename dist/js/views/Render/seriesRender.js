import { isItemFavorite } from "../../utils/localStorage.js";
import { getIdFromUri } from "../../utils/getIdFromUri.js";
export class RenderSeries {
    constructor(container) {
        this.container = container;
    }
    renderSeries(series) {
        const containerId = document.getElementById("container-details-series");
        containerId.dataset.id = series.id.toString();
        const div = document.getElementById("series-image");
        const img = div === null || div === void 0 ? void 0 : div.querySelector("img");
        img === null || img === void 0 ? void 0 : img.classList.add("container-image");
        if (img && series.thumbnail.path && series.thumbnail.extension)
            img.src = `${series.thumbnail.path}.${series.thumbnail.extension}`;
        const btnCardfavorite = document.createElement("button");
        btnCardfavorite.classList.add("favorite");
        const imageBtnCardFavorite = document.createElement("img");
        imageBtnCardFavorite.classList.add("image-btn-card");
        imageBtnCardFavorite.src = "../img/suit-heart.svg";
        btnCardfavorite.classList.add("favorite");
        if (isItemFavorite("favorite", series.currentType, series.id.toString())) {
            imageBtnCardFavorite.src = "../img/suit-heart-fill.svg";
        }
        else {
            imageBtnCardFavorite.src = "../img/suit-heart.svg";
        }
        const title = document.getElementById("series-title");
        if (title)
            title.textContent = series.title || "Titúlo Indisponível";
        const description = document.getElementById("series-description");
        if (description)
            description.textContent = series.description || "Descrição indisponível";
        const startYear = document.getElementById("series-start-year");
        if (startYear)
            startYear.textContent = series.startYear || "Ano de ínicio indisponíveis";
        const endYear = document.getElementById("series-end-year");
        if (endYear)
            endYear.textContent =
                series.endYear || "Ano de encerramento indisponíveis";
        const Containercreators = document.getElementById("list-creators");
        if (Containercreators)
            Containercreators.innerHTML =
                series.creators.items.length > 0
                    ? series.creators.items
                        .map((creators) => `<li>${creators.name}</li>`)
                        .join("")
                    : "<li>Criadores indisponíveis</li>";
        const containerCharacters = document.getElementById("link-characters");
        if (containerCharacters) {
            const items = series.characters.items;
            if (items && items.length > 0) {
                containerCharacters.innerHTML = items
                    .map((character) => {
                    const id = getIdFromUri(character.resourceURI);
                    return `<li><a href="characters.html?type=characters&id=${id}">${character.name}</a>
              <img src='../img/marvel-studios-2.png'>
            </li>`;
                })
                    .join("");
            }
            else {
                containerCharacters.innerHTML = "<li>Personagens indisponíveis</li>";
            }
        }
        const containerComics = document.getElementById("link-comics");
        if (containerComics) {
            const items = series.comics.items;
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
