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
import { ScrollView } from "../views/Scroll/scrollView.js";
export class DetailController {
    constructor(renderCharacters, renderComics, renderSeries) {
        this.renderCharacters = renderCharacters;
        this.renderComics = renderComics;
        this.renderSeries = renderSeries;
        this.scrollView = new ScrollView();
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
        const btnDetailFavorite = document.querySelector(".favorite");
        const imageBtnCardFavorite = btnDetailFavorite.querySelector(".image-btn-card");
        if (isItemFavorite("favorite", type, id)) {
            imageBtnCardFavorite.src = "../img/suit-heart-fill.svg";
        }
        else {
            imageBtnCardFavorite.src = "../img/suit-heart.svg";
        }
        btnDetailFavorite.addEventListener("click", () => {
            id && type && btnDetailFavorite.classList.toggle("favorited");
            if (btnDetailFavorite.classList.contains("favorited")) {
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
                imageBtnCardFavorite.src = "../img/suit-heart-fill.svg";
            }
            else {
                removeItemfavorite("favorite", type, id);
                imageBtnCardFavorite.src = "../img/suit-heart.svg";
            }
        });
    }
    eventBackToHome() {
        const logoMarvel = document.querySelector(".logo-marvel");
        logoMarvel.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const container = document.querySelector(".detail");
            const params = new URLSearchParams(window.location.search);
            const type = params.get("type");
            const id = params.get("id");
            if (!type || !id) {
                throw new Error("Parâmetros inválidos.");
            }
            try {
                switch (type) {
                    case "characters":
                        container.classList.remove('visible');
                        this.scrollView.showLoading();
                        try {
                            const character = yield requestCharactersById(id);
                            if (character)
                                this.renderCharacters.renderCharacters(character);
                            character.currentType = "characters";
                            this.enableEventClickFavorite(character);
                            this.scrollView.hideLoading();
                            container.classList.add('visible');
                        }
                        catch (error) {
                            console.log("Erro ao buscar personagem", error);
                        }
                        finally {
                            this.scrollView.hideLoading();
                        }
                        break;
                    case "comics":
                        container.classList.remove('visible');
                        this.scrollView.showLoading();
                        try {
                            const comics = yield requestComicsById(id);
                            if (comics)
                                this.renderComics.renderComics(comics);
                            comics.currentType = "comics";
                            this.enableEventClickFavorite(comics);
                            this.scrollView.hideLoading();
                            container.classList.add('visible');
                        }
                        catch (error) {
                            console.log("Erro ao buscar quadrinho", error);
                        }
                        finally {
                            this.scrollView.hideLoading();
                        }
                        break;
                    case "series":
                        container.classList.remove('visible');
                        this.scrollView.showLoading();
                        try {
                            const series = yield requestSeriesById(id);
                            if (series)
                                this.renderSeries.renderSeries(series);
                            series.currentType = "series";
                            this.enableEventClickFavorite(series);
                            this.scrollView.hideLoading();
                            container.classList.add('visible');
                        }
                        catch (error) {
                            console.log("Erro ao buscar quadrinho", error);
                        }
                        finally {
                            this.scrollView.hideLoading();
                        }
                        break;
                    default:
                        console.warn("Tipo inválido:", type);
                }
            }
            catch (e) {
                console.error("Erro ao carregar os dados:", e);
            }
            this.openfavoritespage();
            this.eventBackToHome();
        });
    }
}
