import { Series } from "../../interfaces/requestInterface.js";
import { isItemFavorite } from "../../utils/localStorage.js";
import { getIdFromUri } from "../../utils/getIdFromUri.js";

export class RenderSeries {
  constructor(protected container: HTMLElement) {}

  public renderSeries(series: Series) {
    const containerId = document.getElementById(
      "container-details-series"
    ) as HTMLDivElement;
    containerId.dataset.id = series.id.toString();

    const div = document.getElementById(
      "series-image"
    ) as HTMLDivElement;
    const img = div.querySelector("img") as HTMLImageElement | null;
    img?.classList.add("container-image");
    if (img && series.thumbnail.path && series.thumbnail.extension)
      img.src = `${series.thumbnail.path}.${series.thumbnail.extension}`;

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

    if (isItemFavorite("favorite", series.currentType, series.id.toString())) {
      imageBtnCardFavorite.src = "../img/suit-heart-fill.svg";
    } else {
      imageBtnCardFavorite.src = "../img/suit-heart.svg";
    }

    const title = document.getElementById(
      "series-title"
    ) as HTMLDivElement;
    if (title) title.textContent = series.title || "Titúlo Indisponível";

    const description = document.getElementById(
      "series-description"
    ) as HTMLDivElement;
    if (description)
      description.textContent = series.description || "Esta série ainda não tem uma descrição oficial. Mas você pode explorá-la nos personagens e quadrinhos disponíveis!";

    const startYear = document.getElementById(
      "series-start-year"
    ) as HTMLDivElement | null;
    if (startYear)
      startYear.textContent = series.startYear || "Ano de ínicio indisponíveis";

    const endYear = document.getElementById(
      "series-end-year"
    ) as HTMLDivElement;
    if (endYear)
      endYear.textContent =
        series.endYear || "Ano de encerramento indisponíveis";

    const Containercreators = document.getElementById(
      "list-creators"
    ) as HTMLUListElement | null;
    if (Containercreators)
      Containercreators.innerHTML =
        series.creators.items.length > 0
          ? series.creators.items
              .map((creators) => `<li class = 'li-not-hover'>${creators.name}
                <img src='../img/marvel.svg'>
              </li>`)
              .join("")
          : "<li class = 'li-not-hover'>Criadores indisponíveis</li>";

    const containerCharacters = document.getElementById(
      "link-characters"
    ) as HTMLUListElement;
    if (containerCharacters) {
      const items = series.characters.items;
      if (items && items.length > 0) {
        containerCharacters.innerHTML = items
          .map((character) => {
            const id = getIdFromUri(character.resourceURI);
            return `<li><a href="characters.html?type=characters&id=${id}">${character.name}</a>
              <img src='../img/marvel.svg'>
            </li>`;
          })
          .join("");
      } else {
        containerCharacters.innerHTML = "<li class = 'li-not-hover'>Personagens indisponíveis</li>";
      }
    }

    const containerComics = document.getElementById(
      "link-comics"
    ) as HTMLUListElement;
    if (containerComics) {
      const items = series.comics.items;
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
        containerComics.innerHTML = "<li class = 'li-not-hover'>Comics indisponíveis</li>";
      }
    }

    btnCardfavorite.appendChild(imageBtnCardFavorite);
    containerId.appendChild(btnCardfavorite);
  }
}
