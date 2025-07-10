import { Characters } from "../../interfaces/requestInterface.js";
import { isItemFavorite } from "../../utils/localStorage.js";

export class RenderCharacters {
  constructor(protected container: HTMLElement) {}

  public renderCharacters(characters: Characters) {
    const containerId = document.getElementById(
      "container-details-characters",
    ) as HTMLDivElement;
    containerId.dataset.id = characters.id.toString();

    const div = document.getElementById(
      "characters-image",
    ) as HTMLDivElement | null;
    const img = div?.querySelector("img") as HTMLImageElement | null;
    if (img && characters.thumbnail.path && characters.thumbnail.extension)
      img.src = `${characters.thumbnail.path}.${characters.thumbnail.extension}`;

    const btnCardfavorite = document.createElement("button") as HTMLButtonElement;
    btnCardfavorite.classList.add('favorite');
    if(isItemFavorite('favorite', characters.currentType, characters.id.toString())) {
      btnCardfavorite.classList.add('active');
    } else {
      btnCardfavorite.classList.remove('active');
    }

    const name = document.getElementById(
      "characters-name",
    ) as HTMLDivElement | null;
    if (name) name.textContent = characters.name || "Nome Indisponível";

    const description = document.getElementById(
      "characters-description",
    ) as HTMLDivElement | null;
    if (description)
      description.textContent =
        characters.description || "Descrição indisponível";

    const containerSeriesUl = document.getElementById(
      "characters-container-series",
    ) as HTMLUListElement | null;
    if (containerSeriesUl)
      containerSeriesUl.innerHTML =
        characters.series.items.length > 0
          ? characters.series.items
              .map((series) => `<li>${series.name}</li>`)
              .join("")
          : "<li>Séries indisponíveis</li>";

    const containerComicsUl = document.getElementById(
      "characters-container-comics",
    ) as HTMLUListElement | null;
    if (containerComicsUl)
      containerComicsUl.innerHTML =
        characters.comics.items.length > 0
          ? characters.comics.items
              .map((comics) => `<li>${comics.name}</li>`)
              .join("")
          : "<li>Comics indisponíveis</li>";

    containerId.appendChild(btnCardfavorite);
  }
}
