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
import { setItemFavorite } from "../utils/localStorage.js";
import { removeItemfavorite } from "../utils/localStorage.js";
import { isItemFavorite } from "../utils/localStorage.js";
export class DetailController {
    constructor(renderCharacters, renderComics, renderSeries) {
        this.renderCharacters = renderCharacters;
        this.renderComics = renderComics;
        this.renderSeries = renderSeries;
    }
    openfavoritespage() {
        const btnPageFavorite = document.querySelector("#favorite");
        btnPageFavorite.addEventListener("click", () => {
            window.location.href = "favorite.html";
        });
    }
    enableEventClickFavorite(item) {
        const type = item.currentType;
        const id = item.id.toString();
        const name = item.name;
        const title = item.title;
        const imagem = `${item.thumbnail.path}.${item.thumbnail.extension}`;
        const btnDetailFavorite = document.querySelector('.favorite');
        if (isItemFavorite('favorite', type, id)) {
            btnDetailFavorite.classList.add('active');
        }
        else {
            btnDetailFavorite.classList.remove('active');
        }
        btnDetailFavorite.addEventListener('click', () => {
            id && type && btnDetailFavorite.classList.toggle("active");
            if (btnDetailFavorite.classList.contains('active')) {
                const objectFavorite = {
                    [type]: {
                        [id]: {
                            name,
                            title,
                            imagem,
                        },
                    },
                };
                setItemFavorite("favorite", objectFavorite);
            }
            else {
                removeItemfavorite("favorite", type, id);
                btnDetailFavorite === null || btnDetailFavorite === void 0 ? void 0 : btnDetailFavorite.classList.remove("active");
            }
        });
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
                        character.currentType = 'characters';
                        this.enableEventClickFavorite(character);
                        break;
                    case "comics":
                        const comics = yield requestComicsById(id);
                        if (comics)
                            this.renderComics.renderComics(comics);
                        comics.currentType = 'comics';
                        this.enableEventClickFavorite(comics);
                        break;
                    case "series":
                        const series = yield requestSeriesById(id);
                        if (series)
                            this.renderSeries.renderSeries(series);
                        series.currentType = "series";
                        this.enableEventClickFavorite(series);
                        break;
                    default:
                        console.warn("Tipo inválido:", type);
                }
            }
            catch (e) {
                console.error("Erro ao carregar os dados:", e);
            }
            this.openfavoritespage();
        });
    }
}
