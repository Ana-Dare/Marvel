export class RenderCharacters {
    constructor(container) {
        this.container = container;
    }
    renderCharacters(characters) {
        const containerId = document.getElementById("container-details-characters");
        containerId.dataset.id = characters.id.toString();
        const div = document.getElementById("characters-image");
        const img = div === null || div === void 0 ? void 0 : div.querySelector("img");
        if (img && characters.thumbnail.path && characters.thumbnail.extension)
            img.src = `${characters.thumbnail.path}.${characters.thumbnail.extension}`;
        const name = document.getElementById("characters-name");
        if (name)
            name.textContent = characters.name || "Nome Indisponível";
        const description = document.getElementById("characters-description");
        if (description)
            description.textContent =
                characters.description || "Descrição indisponível";
        const containerSeriesUl = document.getElementById("characters-container-series");
        if (containerSeriesUl)
            containerSeriesUl.innerHTML =
                characters.series.items.length > 0
                    ? characters.series.items
                        .map((series) => `<li>${series.name}</li>`)
                        .join("")
                    : "<li>Séries indisponíveis</li>";
        const containerComicsUl = document.getElementById("characters-container-comics");
        if (containerComicsUl)
            containerComicsUl.innerHTML =
                characters.comics.items.length > 0
                    ? characters.comics.items
                        .map((comics) => `<li>${comics.name}</li>`)
                        .join("")
                    : "<li>Comics indisponíveis</li>";
    }
}
