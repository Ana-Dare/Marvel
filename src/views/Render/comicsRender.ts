import { Comics } from "../../interfaces/requestInterface.js";
import { isItemFavorite } from "../../utils/localStorage.js";
import { getIdFromUri } from "../../utils/getIdFromUri.js";

export class RenderComics {
  constructor(protected container: HTMLElement) {}

  public renderComics(comics: Comics) {
    const containerId = document.getElementById(
      "container-details-comics"
    ) as HTMLDivElement;
    containerId.dataset.id = comics.id.toString();

    const div = document.getElementById(
      "comics-image"
    ) as HTMLDivElement | null;
    const img = div?.querySelector("img") as HTMLImageElement | null;
    img?.classList.add("container-image");
    if (img && comics.thumbnail.path && comics.thumbnail.extension)
      img.src = `${comics.thumbnail.path}.${comics.thumbnail.extension}`;

    const btnCardfavorite = document.createElement(
      "button"
    ) as HTMLButtonElement;
    btnCardfavorite.classList.add("favorite");
    const imageBtnCardFavorite = document.createElement(
      "img"
    ) as HTMLImageElement;
    imageBtnCardFavorite.classList.add("image-btn-card");
    imageBtnCardFavorite.src = "../img/suit-heart.svg";
    btnCardfavorite.classList.add("favorite");

    if (isItemFavorite("favorite", comics.currentType, comics.id.toString())) {
      imageBtnCardFavorite.src = "../img/suit-heart-fill.svg";
    } else {
      imageBtnCardFavorite.src = "../img/suit-heart.svg";
    }
    const title = document.getElementById(
      "comics-title"
    ) as HTMLDivElement | null;
    if (title) title.textContent = comics.title || "Titulo Indisponível";

    const description = document.getElementById(
      "comics-description"
    ) as HTMLDivElement | null;
    if (description)
      description.textContent = comics.description || "Descrição indisponível";

    const pageCount = document.getElementById(
      "comics-page-count"
    ) as HTMLDivElement | null;
    if (pageCount)
      pageCount.textContent =
        comics.pageCount ?? "número de páginas não disponível";

    const prices = document.getElementById(
      "comics-prices"
    ) as HTMLDivElement | null;
    if (prices)
      prices.innerHTML = (comics.prices.price ?? 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

    const containerCreators = document.getElementById(
      "list-creators"
    ) as HTMLUListElement | null;
    if (containerCreators)
      containerCreators.innerHTML =
        comics.creators.items.length > 0
          ? comics.creators.items
              .map((creators) => `<li>${creators.name}</li>`)
              .join("")
          : "<li>Sem criadores disponíveis</li>";

    const containerCharacters = document.getElementById(
      "link-characters"
    ) as HTMLUListElement;
    if (containerCharacters) {
      const items = comics.characters?.items;
      if (items && items.length > 0) {
        containerCharacters.innerHTML = items
          .map((character) => {
            const id = getIdFromUri(character.resourceURI);
            return `<li><a href="characters.html?type=characters&id=${id}">${character.name}</a></li>`;
          })
          .join("");
      } else {
        containerCharacters.innerHTML = "<li>Personagens indisponíveis</li>";
      }
    }

    const containerSeries = document.getElementById(
      "link-series"
    ) as HTMLUListElement;
    if (containerSeries) {
      const items = comics.series.items;
      if (items && items.length > 0) {
        containerSeries.innerHTML = items
          .map((serie) => {
            const id = getIdFromUri(serie.resourceURI);
            return `<li><a href="series.html?type=series&id=${id}">${serie.name}</a></li>`;
          })
          .join("");
      } else {
        containerSeries.innerHTML = "<li>Series indisponíveis</li>";
      }
    }

    btnCardfavorite.appendChild(imageBtnCardFavorite);
    containerId.appendChild(btnCardfavorite);
  }
}
