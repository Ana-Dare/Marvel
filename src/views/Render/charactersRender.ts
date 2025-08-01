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
    ) as HTMLDivElement;
    const img = div.querySelector("img") as HTMLImageElement | null;
    img?.classList.add("container-image");
    if (img && characters.thumbnail.path && characters.thumbnail.extension)
      img.src = `${characters.thumbnail.path}.${characters.thumbnail.extension}`;

    const btnCardfavorite = document.createElement(
      "button"
    ) as HTMLButtonElement;
    const imageBtnCardFavorite = document.createElement(
      "img"
    ) as HTMLImageElement;
    imageBtnCardFavorite.classList.add("image-btn-card");
    imageBtnCardFavorite.src = "../img/suit-heart.svg";
    btnCardfavorite.classList.add("favorite");
    if (
      isItemFavorite(
        "favorite",
        characters.currentType,
        characters.id.toString()
      )
    ) {
      imageBtnCardFavorite.src = "../img/suit-heart-fill.svg";
    } else {
      imageBtnCardFavorite.src = "../img/suit-heart.svg";
    }

    const name = document.getElementById(
      "characters-name"
    ) as HTMLDivElement;
    if (name) name.textContent = characters.name || "Nome Indisponível";

    const description = document.getElementById(
      "characters-description"
    ) as HTMLDivElement;
    if (description)
      description.textContent =
        characters.description || "Este personagem ainda não tem uma descrição oficial. Mas você pode explorá-lo nos quadrinhos e séries disponíveis!";

    const containerSeries = document.getElementById(
      "link-series"
    ) as HTMLUListElement;
    if (containerSeries) {
      const items = characters.series.items;
      if (items && items.length > 0) {
        containerSeries.innerHTML = items
          .map((series) => {
            const id = getIdFromUri(series.resourceURI);
            return `<li><a href="series.html?type=series&id=${id}">${series.name}</a>
              <img src='../img/marvel.svg'>
            </li>`;
          })
          .join("");
      } else {
        containerSeries.innerHTML = "<li>Séries indisponíveis</li>";
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
            return `<li><a href="comics.html?type=comics&id=${id}">${comics.name}</a>
              <img src='../img/marvel.svg'>
            </li>`;
          })
          .join("");
      } else {
        containerComics.innerHTML = "<li>Comics indisponíveis</li>";
      }
    }
    btnCardfavorite.appendChild(imageBtnCardFavorite);
    containerId.appendChild(btnCardfavorite);
  }
}
