export class RenderSeries {
    constructor(container) {
        this.container = container;
    }
    renderSeries(series) {
        const containerId = document.getElementById("container-details-series");
        containerId.dataset.id = series.id.toString();
        const div = document.getElementById("series-image");
        const img = div === null || div === void 0 ? void 0 : div.querySelector("img");
        if (img && series.thumbnail.path && series.thumbnail.extension)
            img.src = `${series.thumbnail.path}.${series.thumbnail.extension}`;
        const title = document.getElementById("series-title");
        if (title)
            title.textContent = series.title || "Titúlo Indisponível";
        const description = document.getElementById("series-description");
        if (description)
            description.textContent = series.description || "Descrição indisponível";
        const pageCount = document.getElementById("series-page-count");
        if (pageCount)
            pageCount.textContent =
                series.pageCount || "número de páginas inindisponíveis";
        const startYear = document.getElementById("series-start-year");
        if (startYear)
            startYear.textContent = series.startYear || "Ano de ínicio indisponíveis";
        const endYear = document.getElementById("series-end-year");
        if (endYear)
            endYear.textContent =
                series.endYear || "Ano de encerramento indisponíveis";
        const Containercreators = document.getElementById("series-container-creators");
        if (Containercreators)
            Containercreators.innerHTML =
                series.creators.items.length > 0
                    ? series.creators.items
                        .map((creators) => `<li>${creators.name}</li>`)
                        .join("")
                    : "<li>Criadores indisponíveis</li>";
        const Containercharacters = document.getElementById("series-container-characters");
        if (Containercharacters)
            Containercharacters.innerHTML =
                series.characters.items.length > 0
                    ? series.characters.items
                        .map((characters) => `<li>${characters.name}</li>`)
                        .join("")
                    : "<li>Personaegns indisponíveis</li>";
        const containerComicsUl = document.getElementById("series-container-comics");
        if (containerComicsUl)
            containerComicsUl.innerHTML =
                series.comics.items.length > 0
                    ? series.comics.items
                        .map((comics) => `<li>${comics.name}</li>`)
                        .join("")
                    : "<li>Séries indisponíveis</li>";
    }
}
