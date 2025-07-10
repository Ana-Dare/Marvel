import { isItemFavorite } from "../../utils/localStorage.js";
export class RenderComics {
    constructor(container) {
        this.container = container;
    }
    renderComics(comics) {
        var _a, _b, _c, _d, _e, _f;
        const containerId = document.getElementById("container-details-comics");
        containerId.dataset.id = comics.id.toString();
        const div = document.getElementById("comics-image");
        const img = div === null || div === void 0 ? void 0 : div.querySelector("img");
        if (img && comics.thumbnail.path && comics.thumbnail.extension)
            img.src = `${comics.thumbnail.path}.${comics.thumbnail.extension}`;
        const btnCardfavorite = document.createElement("button");
        btnCardfavorite.classList.add('favorite');
        if (isItemFavorite('favorite', comics.currentType, comics.id.toString())) {
            btnCardfavorite.classList.add('active');
        }
        else {
            btnCardfavorite.classList.remove('active');
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
        const containerCreators = document.getElementById("comics-container-creators");
        if (containerCreators)
            containerCreators.innerHTML =
                comics.creators.items.length > 0
                    ? comics.creators.items
                        .map((creators) => `<li>${creators.name}</li>`)
                        .join("")
                    : "<li>Sem criadores disponíveis</li>";
        const containerCharacters = document.getElementById("comics-container-characters");
        if (containerCharacters)
            containerCharacters.innerHTML =
                ((_d = (_c = comics.characters) === null || _c === void 0 ? void 0 : _c.items) === null || _d === void 0 ? void 0 : _d.length) > 0
                    ? comics.characters.items
                        .map((characters) => `<li>${characters.name}</li>`)
                        .join("")
                    : "<li>Personagens indisponíveis</li>";
        const containerSeries = document.getElementById("comics-container-series");
        if (containerSeries)
            containerSeries.innerHTML =
                ((_f = (_e = comics.series) === null || _e === void 0 ? void 0 : _e.items) === null || _f === void 0 ? void 0 : _f.length) > 0
                    ? comics.series.items
                        .map((series) => `<li>${series.name}</li>`)
                        .join("")
                    : "<li>Séries indisponíveis</li>";
        containerId.appendChild(btnCardfavorite);
    }
}
