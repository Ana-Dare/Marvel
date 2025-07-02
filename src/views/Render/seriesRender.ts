import { Series } from "../../interfaces/requestInterface.js"; 

export class RenderSeries {
    constructor(protected container: HTMLElement)
    {}

public renderSeries(series: Series) {
    const containerId = document.getElementById('container-details-series') as HTMLDivElement;
    containerId.dataset.id = series.id.toString();

    const div = document.getElementById('series-image') as HTMLDivElement | null;
    const img = div?.querySelector('img') as HTMLImageElement | null;
    if (img && series.thumbnail.path && series.thumbnail.extension) 
    img.src = `${series.thumbnail.path}.${series.thumbnail.extension}`;
    
    const title = document.getElementById('series-title') as HTMLDivElement | null;
    if (title) 
        title.textContent = series.title || "Titúlo Indisponível";
  
    const description = document.getElementById('series-description') as HTMLDivElement | null;
    if (description) 
        description.textContent = series.description || "Descrição indisponível";

    const pageCount = document.getElementById('series-page-count') as HTMLDivElement | null;
    if (pageCount) 
        pageCount.textContent = series.pageCount || "número de páginas inindisponíveis";

    const startYear = document.getElementById('series-start-year') as HTMLDivElement | null;
    if (startYear) 
        startYear.textContent = series.startYear || "Ano de ínicio indisponíveis";

    const endYear = document.getElementById('series-end-year') as HTMLDivElement | null;
    if (endYear) 
        endYear.textContent = series.endYear || "Ano de encerramento indisponíveis";
    
    const Containercreators = document.getElementById('series-container-creators') as HTMLDivElement | null;
    if (Containercreators) 
    Containercreators.innerHTML = series.creators.items.length > 0
        ? series.creators.items.map(creators => `<li>${creators.name}</li>`).join("")
        : "<li>Criadores indisponíveis</li>";
    

    const Containercharacters = document.getElementById('series-container-characters') as HTMLDivElement | null;
    if (Containercharacters) 
    Containercharacters.innerHTML = series.characters.items.length > 0
        ? series.characters.items.map(characters => `<li>${characters.name}</li>`).join("")
        : "<li>Personaegns indisponíveis</li>";
    

    const containerComicsUl = document.getElementById('series-container-comics') as HTMLDivElement | null;
    if (containerComicsUl) 
    containerComicsUl.innerHTML = series.comics.items.length > 0
        ? series.comics.items.map(comics => `<li>${comics.name}</li>`).join("")
        : "<li>Séries indisponíveis</li>";
    
    }
}