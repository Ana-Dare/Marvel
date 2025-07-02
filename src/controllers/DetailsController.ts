
import { requestCharactersById } from "../services/requests/CharactersById.js";
import { RenderCharacters } from "../views/Render/charactersRender.js";
import { requestComicsById } from "../services/requests/ComicsById.js";
import { RenderComics } from "../views/Render/comicsRender.js";
import { requestSeriesById } from "../services/requests/SeriesById.js";
import { RenderSeries } from "../views/Render/seriesRender.js";
import { ContentType } from "../interfaces/requestInterface.js";

export class DetailController {
  constructor(
    private renderCharacters: RenderCharacters,
    private renderComics: RenderComics,
    private renderSeries: RenderSeries,
  ) {
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
          console.log("Buscando comics por ID:", id);
          break;

        case "comics":
          const comics = await requestComicsById(id);
          if (comics) this.renderComics.renderComics(comics);
          break;

        case "series":
          const series = await requestSeriesById(id);
          if (series) this.renderSeries.renderSeries(series);
          break;

        default:
          console.warn("Tipo inválido:", type);
      }
    } catch (e) {
      console.error("Erro ao carregar os dados:", e);
    }
  }
}
