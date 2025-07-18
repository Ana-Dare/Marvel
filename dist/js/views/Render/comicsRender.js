import { isItemFavorite } from "../../utils/localStorage.js";
import { getIdFromUri } from "../../utils/getIdFromUri.js";
export class RenderComics {
    constructor(container) {
        this.container = container;
    }
    renderComics(comics) {
        var _a, _b, _c;
        const containerId = document.getElementById("container-details-comics");
        containerId.dataset.id = comics.id.toString();
        const div = document.getElementById("comics-image");
        const img = div === null || div === void 0 ? void 0 : div.querySelector("img");
        img === null || img === void 0 ? void 0 : img.classList.add("container-image");
        if (img && comics.thumbnail.path && comics.thumbnail.extension)
            img.src = `${comics.thumbnail.path}.${comics.thumbnail.extension}`;
        const btnCardfavorite = document.createElement("button");
        btnCardfavorite.classList.add("favorite");
        const imageBtnCardFavorite = document.createElement("img");
        imageBtnCardFavorite.classList.add("image-btn-card");
        imageBtnCardFavorite.src = "../img/suit-heart.svg";
        btnCardfavorite.classList.add("favorite");
        if (isItemFavorite("favorite", comics.currentType, comics.id.toString())) {
            imageBtnCardFavorite.src = "../img/suit-heart-fill.svg";
        }
        else {
            imageBtnCardFavorite.src = "../img/suit-heart.svg";
        }
        const title = document.getElementById("comics-title");
        if (title)
            title.textContent = comics.title || "Titulo Indisponível";
        const description = document.getElementById("comics-description");
        if (description)
            description.textContent = comics.description || "Descrição indisponível";
        const pageCount = document.getElementById("comics-page-count");
        if (pageCount)
            pageCount.textContent =
                (_a = comics.pageCount) !== null && _a !== void 0 ? _a : "número de páginas não disponível";
        const prices = document.getElementById("comics-prices");
        if (prices)
            prices.innerHTML = ((_b = comics.prices.price) !== null && _b !== void 0 ? _b : 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            });
        const containerCreators = document.getElementById("list-creators");
        if (containerCreators)
            containerCreators.innerHTML =
                comics.creators.items.length > 0
                    ? comics.creators.items
                        .map((creators) => `<li>${creators.name}</li>`)
                        .join("")
                    : "<li>Sem criadores disponíveis</li>";
        const containerCharacters = document.getElementById("link-characters");
        if (containerCharacters) {
            const items = (_c = comics.characters) === null || _c === void 0 ? void 0 : _c.items;
            if (items && items.length > 0) {
                containerCharacters.innerHTML = items
                    .map((character) => {
                    const id = getIdFromUri(character.resourceURI);
                    return `<li><a href="characters.html?type=characters&id=${id}">${character.name}</a></li>`;
                })
                    .join("");
            }
            else {
                containerCharacters.innerHTML = "<li>Personagens indisponíveis</li>";
            }
        }
        const containerSeries = document.getElementById("link-series");
        if (containerSeries) {
            const items = comics.series.items;
            if (items && items.length > 0) {
                containerSeries.innerHTML = items
                    .map((serie) => {
                    const id = getIdFromUri(serie.resourceURI);
                    return `<li><a href="series.html?type=series&id=${id}">${serie.name}</a></li>`;
                })
                    .join("");
            }
            else {
                containerSeries.innerHTML = "<li>Series indisponíveis</li>";
            }
        }
        btnCardfavorite.appendChild(imageBtnCardFavorite);
        containerId.appendChild(btnCardfavorite);
    }
}
