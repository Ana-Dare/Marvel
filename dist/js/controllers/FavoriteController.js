var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { removeItemfavorite } from "../utils/localStorage.js";
export class favoriteController {
    constructor(renderFavorite, container) {
        this.renderFavorite = renderFavorite;
        this.container = container;
        this.selectedType = "characters";
        this.currentTerm = "";
        this.btnFilters = document.querySelectorAll(".filtro");
    }
    removeItemPageFavorite() {
        this.renderFavorite.container.addEventListener("click", (event) => {
            const target = event.target;
            const btn = target.closest(".favorite");
            if (btn) {
                const card = btn.closest(".item-container");
                const id = card === null || card === void 0 ? void 0 : card.dataset.id;
                const type = card === null || card === void 0 ? void 0 : card.dataset.type;
                if (id && type) {
                    removeItemfavorite("favorite", type, id);
                    card.remove();
                }
            }
        });
    }
    enableFilterOnCurrentType() {
        this.btnFilters.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const target = e.currentTarget;
                const type = target.dataset.tipo;
                if (!type)
                    return;
                this.btnFilters.forEach((b) => b.classList.remove("ativo"));
                target.classList.add("ativo");
                switch (type) {
                    case "characters":
                        this.renderFavorite.renderitemFavorites("characters");
                        break;
                    case "comics":
                        this.renderFavorite.renderitemFavorites("comics");
                        break;
                    case "series":
                        this.renderFavorite.renderitemFavorites("series");
                        break;
                    default:
                        console.warn("Tipo inválido:", type);
                        break;
                }
            });
        });
    }
    enableClickEventOnCards() {
        if (!this.container)
            return;
        this.container.addEventListener("click", (e) => {
            const target = e.target;
            if (target.closest(".favorite"))
                return;
            const card = target.closest(".item-container");
            if (card && card instanceof HTMLElement) {
                const id = card.dataset.id;
                const type = card.dataset.type;
                if (id && type) {
                    window.location.href = `${type}.html?type=${type}&id=${id}`;
                }
            }
        });
    }
    enableSearchEvent() {
        const inputSearch = document.querySelector("#input-search-favorite");
        const btnSearch = document.querySelector("#btn-search-favorite");
        this.btnFilters.forEach((btn) => {
            btn.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
                const target = e.currentTarget;
                this.selectedType = target.dataset.tipo;
            }));
        });
        btnSearch.addEventListener("click", () => {
            this.currentTerm = inputSearch.value.trim();
            const objectString = localStorage.getItem("favorite") || "{}";
            const favorites = JSON.parse(objectString);
            const selectedFavorites = favorites[this.selectedType] || {};
            const filtered = Object.fromEntries(Object.entries(selectedFavorites).filter(([id, item]) => (item.name || item.title).toLowerCase().includes(this.currentTerm)));
            this.renderFavorite.renderitemFavorites(this.selectedType, filtered);
        });
        inputSearch.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                btnSearch.click();
            }
        });
    }
    resetSearch() {
        const inputSearch = document.querySelector("#input-search-favorite");
        const btnResetSearch = document.querySelector("#deletar-search-favorite");
        btnResetSearch.addEventListener("click", () => {
            this.renderFavorite.renderitemFavorites(this.selectedType);
            inputSearch.value = "";
            this.currentTerm = "";
        });
    }
    eventBackToHome() {
        const logoMarvel = document.querySelector(".logo-marvel");
        logoMarvel.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }
    initialize() {
        this.enableFilterOnCurrentType();
        const btnDefault = document.querySelector('[data-tipo="characters"]');
        btnDefault.classList.add("ativo");
        this.renderFavorite.renderitemFavorites("characters");
        this.enableSearchEvent();
        this.removeItemPageFavorite();
        this.enableClickEventOnCards();
        this.resetSearch();
        this.eventBackToHome();
    }
}
