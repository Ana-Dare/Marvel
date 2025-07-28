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
    enableEventClickFavorite(item, type) {
        const id = item.id.toString();
        const name = item.name;
        const title = item.title;
        const imagem = `${item.thumbnail.path}.${item.thumbnail.extension}`;
        const btnDetailFavorite = document.querySelector(".favorite");
        const imageBtnCardFavorite = btnDetailFavorite.querySelector(".image-btn-card");
        if (isItemFavorite("favorite", type, id)) {
            imageBtnCardFavorite.src = "../img/suit-heart-fill.svg";
            btnDetailFavorite.classList.add("favorited");
        }
        else {
            imageBtnCardFavorite.src = "../img/suit-heart.svg";
            btnDetailFavorite.classList.remove("favorited");
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
    handleTabMenu(menuId) {
        const menu = document.getElementById(menuId);
        if (!menu)
            return;
        const buttons = menu.querySelectorAll("button");
        const sections = document.querySelectorAll(".section");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const target = button.dataset.target;
                if (!target)
                    return;
                const targetSection = document.getElementById(`section-${target}`);
                const isAlreadyVisible = targetSection.classList.contains("show");
                sections.forEach((section) => section.classList.remove("show"));
                buttons.forEach((btn) => btn.classList.remove("show"));
                if (!isAlreadyVisible) {
                    targetSection.classList.add("show");
                    button.classList.add("show");
                }
            });
        });
    }
    fetchDataAndRender(type, id, request, render, container) {
        return __awaiter(this, void 0, void 0, function* () {
            container.classList.remove("visible");
            this.scrollView.showLoading();
            try {
                const data = yield request(id);
                if (data) {
                    render(data);
                    this.enableEventClickFavorite(data, type);
                    console.log(this.enableEventClickFavorite);
                    this.scrollView.hideLoading();
                    container.classList.add("visible");
                }
                else {
                    console.warn(`Dados para ${type} com ID ${id} não encontrados.`);
                }
            }
            catch (error) {
                console.error(`Erro ao buscar ${type}:`, error);
                container.innerHTML =
                    "Não foi possível carregar os dados. Tente novamente mais tarde";
            }
            finally {
                this.scrollView.hideLoading();
            }
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
                        yield this.fetchDataAndRender("characters", id, requestCharactersById, this.renderCharacters.renderCharacters, container);
                        break;
                    case "comics":
                        yield this.fetchDataAndRender("comics", id, requestComicsById, this.renderComics.renderComics, container);
                        break;
                    case "series":
                        yield this.fetchDataAndRender("series", id, requestSeriesById, this.renderSeries.renderSeries, container);
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
            this.handleTabMenu("menu");
        });
    }
}
