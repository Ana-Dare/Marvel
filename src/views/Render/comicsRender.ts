import { Comics } from "../../interfaces/requestInterface.js";
import { isItemFavorite } from "../../utils/localStorage.js";

export class RenderComics {
  constructor(protected container: HTMLElement) {}

  public renderComics(comics: Comics) {
    const containerId = document.getElementById(
      "container-details-comics",
    ) as HTMLDivElement;
    containerId.dataset.id = comics.id.toString();

    const div = document.getElementById(
      "comics-image",
    ) as HTMLDivElement | null;
    const img = div?.querySelector("img") as HTMLImageElement | null;
    if (img && comics.thumbnail.path && comics.thumbnail.extension)
      img.src = `${comics.thumbnail.path}.${comics.thumbnail.extension}`;

    const btnCardfavorite = document.createElement("button") as HTMLButtonElement;
    btnCardfavorite.classList.add('favorite');

    if(isItemFavorite('favorite', comics.currentType, comics.id.toString())) {
      btnCardfavorite.classList.add('active');
    } else {
      btnCardfavorite.classList.remove('active');
    }
    const title = document.getElementById(
      "comics-title",
    ) as HTMLDivElement | null;
    if (title) title.textContent = comics.title || "Titulo Indisponível";

    const description = document.getElementById(
      "comics-description",
    ) as HTMLDivElement | null;
    if (description)
      description.textContent = comics.description || "Descrição indisponível";

    const pageCount = document.getElementById(
      "comics-page-count",
    ) as HTMLDivElement | null;
    if (pageCount)
      pageCount.textContent =
        comics.pageCount ?? "número de páginas não disponível";

    const prices = document.getElementById(
      "comics-prices",
    ) as HTMLDivElement | null;
    if (prices)
      prices.innerHTML = (comics.prices.price ?? 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

    const containerCreators = document.getElementById(
      "comics-container-creators",
    ) as HTMLDivElement | null;
    if (containerCreators)
      containerCreators.innerHTML =
        comics.creators.items.length > 0
          ? comics.creators.items
              .map((creators) => `<li>${creators.name}</li>`)
              .join("")
          : "<li>Sem criadores disponíveis</li>";

    const containerCharacters = document.getElementById(
      "comics-container-characters",
    ) as HTMLDivElement | null;
    if (containerCharacters)
      containerCharacters.innerHTML =
        comics.characters?.items?.length > 0
          ? comics.characters.items
              .map((characters) => `<li>${characters.name}</li>`)
              .join("")
          : "<li>Personagens indisponíveis</li>";

    const containerSeries = document.getElementById(
      "comics-container-series",
    ) as HTMLDivElement | null;
    if (containerSeries)
      containerSeries.innerHTML =
        comics.series?.items?.length > 0
          ? comics.series.items
              .map((series) => `<li>${series.name}</li>`)
              .join("")
          : "<li>Séries indisponíveis</li>";

    containerId.appendChild(btnCardfavorite);
  }
}
