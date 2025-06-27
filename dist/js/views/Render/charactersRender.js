export class RenderCharacters {
    constructor(container) {
        this.container = container;
    }
    renderCharacters(characters) {
        const containerId = document.createElement('div');
        containerId.dataset.id = characters.id.toString();
        const img = document.querySelector('.mainImage');
        if (characters.thumbnail.path && characters.thumbnail.extension) {
            img.src = `${characters.thumbnail.path}.${characters.thumbnail.extension}`;
        }
        const name = document.querySelector('.mainName');
        name.textContent = characters.name || "Nome Indisponovél";
        const description = document.querySelector('.description');
        description.textContent = characters.description || "Descrição indisponível";
        const containerSeries = document.querySelector('.container-series');
        containerSeries.textContent = characters.series.items.length > 0
            ? characters.series.items.map(series => `<li>${series.name}</li>`).join("")
            : "<li>Sem series disponíveis</li>";
        const containerComics = document.querySelector('.container-comics');
        containerComics.textContent = characters.comics.items.length > 0
            ? characters.comics.items.map(comics => `<li>${comics.name}</li>`).join("")
            : "<li>Sem series disponíveis</li>";
    }
}
