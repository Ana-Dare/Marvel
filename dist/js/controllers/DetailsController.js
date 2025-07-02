var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { requestCharactersById } from "../services/requests/CharactersById.js";
import { requestComicsById } from "../services/requests/ComicsById.js";
import { requestSeriesById } from "../services/requests/SeriesById.js";
export class DetailController {
    constructor(renderCharacters, renderComics, renderSeries) {
        this.renderCharacters = renderCharacters;
        this.renderComics = renderComics;
        this.renderSeries = renderSeries;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = new URLSearchParams(window.location.search);
            const type = params.get("type");
            const id = params.get("id");
            if (!type || !id) {
                throw new Error("Parâmetros inválidos.");
            }
            try {
                switch (type) {
                    case "characters":
                        const character = yield requestCharactersById(id);
                        if (character)
                            this.renderCharacters.renderCharacters(character);
                        console.log("Buscando comics por ID:", id);
                        break;
                    case "comics":
                        const comics = yield requestComicsById(id);
                        if (comics)
                            this.renderComics.renderComics(comics);
                        break;
                    case "series":
                        const series = yield requestSeriesById(id);
                        if (series)
                            this.renderSeries.renderSeries(series);
                        break;
                    default:
                        console.warn("Tipo inválido:", type);
                }
            }
            catch (e) {
                console.error("Erro ao carregar os dados:", e);
            }
        });
    }
}
