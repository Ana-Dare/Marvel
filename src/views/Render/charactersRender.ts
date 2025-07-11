import { Characters } from "../../interfaces/requestInterface.js";
import { getIdFromUri } from "../../utils/getIdFromUri.js";
import { isItemFavorite } from "../../utils/localStorage.js";

export class RenderCharacters {
  constructor(protected container: HTMLElement) {}

  public renderCharacters(characters: Characters) {
    const containerId = document.getElementById(
      "container-details-characters"
    ) as HTMLDivElement;
    containerId.dataset.id = characters.id.toString();

    const div = document.getElementById(
      "characters-image"
    ) as HTMLDivElement | null;
    const img = div?.querySelector("img") as HTMLImageElement | null;
    if (img && characters.thumbnail.path && characters.thumbnail.extension)
      img.src = `${characters.thumbnail.path}.${characters.thumbnail.extension}`;

    const btnCardfavorite = document.createElement(
      "button"
    ) as HTMLButtonElement;
    btnCardfavorite.classList.add("favorite");
    if (
      isItemFavorite(
        "favorite",
        characters.currentType,
        characters.id.toString()
      )
    ) {
      btnCardfavorite.classList.add("active");
    } else {
      btnCardfavorite.classList.remove("active");
    }

    const name = document.getElementById(
      "characters-name"
    ) as HTMLDivElement | null;
    if (name) name.textContent = characters.name || "Nome Indisponível";

    const description = document.getElementById(
      "characters-description"
    ) as HTMLDivElement | null;
    if (description)
      description.textContent =
        characters.description || "Descrição indisponível";

    const containerSeries = document.getElementById(
      "link-series"
    ) as HTMLUListElement;
    if (containerSeries) {
      const items = characters.series.items;
      if (items && items.length > 0) {
        containerSeries.innerHTML = items
          .map((series) => {
            const id = getIdFromUri(series.resourceURI);
            return `<li><a href="series.html?type=series&id=${id}">${series.name}</a></li>`;
          })
          .join("");
      } else {
        containerSeries.innerHTML = "<li>Series indisponíveis</li>";
      }
    }

    const containerComics = document.getElementById(
      "link-comics"
    ) as HTMLUListElement;
    if (containerComics) {
      const items = characters.comics.items;
      if (items && items.length > 0) {
        containerComics.innerHTML = items
          .map((comics) => {
            const id = getIdFromUri(comics.resourceURI);
            return `<li><a href="comics.html?type=comics&id=${id}">${comics.name}</a></li>`;
          })
          .join("");
      } else {
        containerComics.innerHTML = "<li>Comics indisponíveis</li>";
      }
    }

    containerId.appendChild(btnCardfavorite);
  }
}
