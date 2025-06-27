import { Characters } from "../../interfaces/requestInterface.js"; 

export class RenderCharacters {
    constructor(protected container: HTMLElement)
    {}

    public renderCharacters(characters: Characters) {
        const containerId = document.createElement('div') as HTMLDivElement;
        containerId.dataset.id = characters.id.toString();

        const img = document.querySelector('.mainImage') as HTMLImageElement;
          if (characters.thumbnail.path && characters.thumbnail.extension) {
            img.src = `${characters.thumbnail.path}.${characters.thumbnail.extension}`;
        } 

        const name = document.querySelector('.mainName') as HTMLDivElement;
        name.textContent = characters.name || "Nome Indisponovél";

        const description = document.querySelector('.description') as HTMLDivElement;
        description.textContent = characters.description || "Descrição indisponível";

        const containerSeries = document.querySelector('.container-series') as HTMLDivElement;
        containerSeries.textContent =  characters.series.items.length > 0 
        ? characters.series.items.map(series =>`<li>${series.name}</li>`).join("")
        : "<li>Sem series disponíveis</li>" 

        const containerComics = document.querySelector('.container-comics') as HTMLDivElement;
        containerComics.textContent =  characters.comics.items.length > 0 
        ? characters.comics.items.map(comics =>`<li>${comics.name}</li>`).join("")
        : "<li>Sem series disponíveis</li>" 
    }
}