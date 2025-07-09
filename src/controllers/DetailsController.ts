import { requestCharactersById } from "../services/requests/CharactersById.js";
import { RenderCharacters } from "../views/Render/charactersRender.js";
import { requestComicsById } from "../services/requests/ComicsById.js";
import { RenderComics } from "../views/Render/comicsRender.js";
import { requestSeriesById } from "../services/requests/SeriesById.js";
import { RenderSeries } from "../views/Render/seriesRender.js";
import { DataApi } from "../interfaces/requestInterface.js";
import { setItemFavorite } from "../utils/localStorage.js";
import { removeItemfavorite } from "../utils/localStorage.js";
import { ObjectFavoriteInterface } from "../utils/localStorage.js";
import { isItemFavorite } from "../utils/localStorage.js";

export class DetailController {
  constructor(
    private renderCharacters: RenderCharacters,
    private renderComics: RenderComics,
    private renderSeries: RenderSeries
  ) {}

  private openfavoritespage(): void {
    const btnPageFavorite = document.querySelector(
      "#favorite"
    ) as HTMLButtonElement;
    btnPageFavorite.addEventListener("click", () => {
      window.location.href = "favorite.html";
    });
  }

  private enableEventClickFavorite(item:DataApi) {
    const type = item.currentType
    const id = item.id.toString() as string;
    const name = item.name as string;
    const title = item.title as string;
    const imagem = `${item.thumbnail.path}.${item.thumbnail.extension}` as string;
    const btnDetailFavorite = document.querySelector('.favorite') as HTMLButtonElement;
    if (isItemFavorite('favorite', type, id)) {
    btnDetailFavorite.classList.add('active');
    } else {
      btnDetailFavorite.classList.remove('active');
    }
    btnDetailFavorite.addEventListener('click', () => {
      id && type && btnDetailFavorite.classList.toggle("active");
      if(btnDetailFavorite.classList.contains('active')) {
        const objectFavorite: ObjectFavoriteInterface = {
          [type]: {
            [id]: {
              name,
              title,
              imagem,
            },
          },
        };
      
      setItemFavorite("favorite", objectFavorite);
      } else {
        removeItemfavorite("favorite", type, id);
        btnDetailFavorite?.classList.remove("active");
      }
    })
  }

  public async initialize() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const id = params.get("id");

    if (!type || !id) {
      throw new Error("Parâmetros inválidos.");
    }
    try {
      switch (type) {
        case "characters":
          const character = await requestCharactersById(id);
          if (character) this.renderCharacters.renderCharacters(character);
          character.currentType = 'characters';
          this.enableEventClickFavorite(character);
          break;

        case "comics":
          const comics = await requestComicsById(id);
          if (comics) this.renderComics.renderComics(comics);
          comics.currentType = 'comics';
          this.enableEventClickFavorite(comics);
          break;

        case "series":
          const series = await requestSeriesById(id);
          if (series) this.renderSeries.renderSeries(series);
          series.currentType = "series";
          this.enableEventClickFavorite(series)
          break;

        default:
          console.warn("Tipo inválido:", type);
      }
    } catch (e) {
      console.error("Erro ao carregar os dados:", e);
    }
    this.openfavoritespage();
  }
}
