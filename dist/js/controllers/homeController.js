var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Renderer } from "../views/Render/homeRender.js";
import { obterOrderBy } from "../utils/orderby-utils.js";
import { ScrollDetector } from "./ScrollDetector .js";
import { ScrollView } from "../views/Scroll/scrollView.js";
import { LoadingUI } from "../views/Scroll/LoadingUI.js";
import { mapApiResults } from "../mappers/mapHomeResults.js";
import { fetchFromAPI } from "../services/Api.js";
import { ResultsInfoView } from "../views/Scroll/resultsInfo.js";
import { cacheService } from "../models/cache.js";
import { createUrl } from "../utils/createurl-utils.js";
import { ContentDataFetcher } from "../utils/contentDataFetcher.js";
import { PaginationController } from "../utils/pagination.js";
import { ContentDisplay } from "../views/contentDisplay.js";
import { setItemFavorite } from "../utils/localStorage.js";
import { removeItemfavorite } from "../utils/localStorage.js";
const btnFilters = Array.from(document.querySelectorAll(".filtro"));
const btnSearch = document.querySelector("#buscar");
const inputSearch = document.querySelector("#search");
const orderSelect = document.querySelector("#selec-order");
export class ControllerApi {
    constructor(container, currentType) {
        this.container = container;
        this.currentType = currentType;
        this.offset = 0;
        this.total = 0;
        this.isEndOfData = false;
        this.limit = 10;
        this.currentTerm = "";
        this.currentOrder = "";
        this.initialLoadDone = false;
        this.renderer = new Renderer(container, currentType);
        this.scrollView = new ScrollView();
        this.loadingUI = new LoadingUI();
        this.resultsInfoView = new ResultsInfoView();
        this.dataFetcher = new ContentDataFetcher(this.getData.bind(this));
        this.paginationController = new PaginationController(this.limit);
        this.displayContent = new ContentDisplay(this.renderer);
        this.scroll = new ScrollDetector(() => __awaiter(this, void 0, void 0, function* () {
            if (this.isEndOfData)
                return;
            this.scroll.lock();
            this.scrollView.showLoading();
            yield this.updateContent(this.currentType, this.currentTerm, false);
            this.scroll.unlock();
            this.scrollView.hideLoading();
        }));
    }
    enableEventsSearch() {
        btnFilters.forEach((btn) => {
            btn.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
                const target = e.currentTarget;
                btnFilters.forEach((btn) => btn.classList.remove("ativo"));
                target.classList.add("ativo");
                const type = target.dataset.type;
                if (type) {
                    const inputTerm = inputSearch.value.trim();
                    this.currentTerm = inputTerm;
                    this.renderer.toClean();
                    this.resultsInfoView.hideResults();
                    this.currentType = type;
                    this.renderer.changeType(type);
                    const sortValue = (orderSelect === null || orderSelect === void 0 ? void 0 : orderSelect.value) || "";
                    this.currentOrder = obterOrderBy(this.currentType, sortValue);
                    yield this.updateContent(this.currentType, this.currentTerm, true);
                }
            }));
        });
        btnSearch.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            if (inputSearch) {
                const inputTerm = inputSearch.value.trim();
                if (!inputTerm) {
                    return;
                }
                this.currentTerm = inputTerm;
                this.renderer.toClean();
                this.resultsInfoView.hideResults();
                const sortValue = (orderSelect === null || orderSelect === void 0 ? void 0 : orderSelect.value) || "";
                this.currentOrder = obterOrderBy(this.currentType, sortValue);
                yield this.updateContent(this.currentType, this.currentTerm, true);
            }
        }));
        inputSearch.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                btnSearch.click();
            }
        });
        orderSelect.addEventListener("change", () => __awaiter(this, void 0, void 0, function* () {
            const inputTerm = inputSearch.value.trim();
            this.currentTerm = inputTerm;
            this.renderer.toClean();
            this.resultsInfoView.hideResults();
            const sortValue = (orderSelect === null || orderSelect === void 0 ? void 0 : orderSelect.value) || "";
            this.currentOrder = obterOrderBy(this.currentType, sortValue);
            yield this.updateContent(this.currentType, this.currentTerm, true);
        }));
    }
    eventBackToHome() {
        const logoMarvel = document.querySelector(".logo-marvel");
        logoMarvel.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }
    enableFavoriteClickEvent() {
        this.container &&
            this.container.addEventListener("click", (e) => {
                const target = e.target;
                const btn = target.closest(".favorite");
                const card = btn && btn.closest(".item-container");
                const id = card === null || card === void 0 ? void 0 : card.dataset.id;
                const type = card === null || card === void 0 ? void 0 : card.dataset.type;
                const name = card === null || card === void 0 ? void 0 : card.dataset.name;
                const imgBtnCard = btn === null || btn === void 0 ? void 0 : btn.querySelector(".image-btn-card");
                const title = card === null || card === void 0 ? void 0 : card.dataset.title;
                const imagem = `${card === null || card === void 0 ? void 0 : card.dataset.thumbnailPath}.${card === null || card === void 0 ? void 0 : card.dataset.thumbnailExtension}`;
                id && type && btn && btn.classList.toggle("favorited");
                if (btn === null || btn === void 0 ? void 0 : btn.classList.contains("favorited")) {
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
                    imgBtnCard.src = "../img/suit-heart-fill.svg";
                }
                else {
                    removeItemfavorite("favorite", type, id);
                    imgBtnCard.src = "../img/suit-heart.svg";
                }
            });
    }
    openfavoritesPage() {
        const btnPageFavorite = document.querySelector("#favorite");
        btnPageFavorite.addEventListener("click", () => {
            window.location.href = "pages/favorite.html";
        });
    }
    setInitialFilter(type) {
        btnFilters.forEach((btn) => {
            btn.classList.remove("ativo");
            if (btn.dataset.type === type) {
                btn.classList.add("ativo");
            }
        });
    }
    resetSearch() {
        const BtnResetSearch = document.querySelector("#reset-search");
        BtnResetSearch.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            inputSearch.value = "";
            this.currentTerm = "";
            this.offset = 0;
            this.isEndOfData = false;
            this.currentType = "characters";
            this.renderer.changeType("characters");
            this.offset = 0;
            this.limit = 10;
            this.total = 0;
            this.currentOrder = "";
            orderSelect.value = "Mais recentes";
            this.setInitialFilter("characters");
            yield this.updateContent("characters", "", true);
        }));
    }
    enableClickEventsOnCards() {
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
                    window.location.href = `pages/${type}.html?type=${type}&id=${id}`;
                }
            }
        });
    }
    getData(type, termo) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const url = createUrl(type, termo, this.offset, this.limit, this.currentOrder);
            try {
                const cache = cacheService.get(url);
                if (cache)
                    return cache;
                const { dados } = yield fetchFromAPI(type, termo, this.offset, this.limit, this.currentOrder);
                const total = (_a = dados.data) === null || _a === void 0 ? void 0 : _a.total;
                const results = dados.data.results;
                const itens = mapApiResults(results, type);
                cacheService.set(url, { itens, total });
                return { itens, total };
            }
            catch (error) {
                console.error("Erro ao buscar dados:", error);
                const noMoreResults = document.querySelector("#noMoreResults");
                noMoreResults.style.display = "block";
                noMoreResults.innerHTML = "Erro ao buscar dados, tente novamente.";
                throw error;
            }
        });
    }
    updateContent(type_1, termo_1) {
        return __awaiter(this, arguments, void 0, function* (type, termo, limpar = false) {
            const sortValue = (orderSelect === null || orderSelect === void 0 ? void 0 : orderSelect.value) || "";
            this.currentOrder = obterOrderBy(this.currentType, sortValue);
            this.loadingUI.disableUI();
            this.scrollView.HideEndResults();
            this.scroll.lock();
            this.scrollView.showLoading();
            if (limpar) {
                this.offset = 0;
                this.isEndOfData = false;
            }
            if (this.isEndOfData) {
                this.resultsInfoView.showAllLoaded(this.total);
                this.loadingUI.enableUI();
                return;
            }
            try {
                const { itens, total } = yield this.dataFetcher.fetchContent(type, termo);
                if (itens.length === 0) {
                    this.scrollView.showNoResults();
                    this.loadingUI.enableUI();
                    this.scroll.unlock();
                    this.scrollView.hideLoading();
                    return;
                }
                this.displayContent.clearIfFirstPage(this.offset);
                this.displayContent.renderItems(itens);
                this.total = total;
                this.offset = this.paginationController.calculateNextOffset(this.offset);
                this.resultsInfoView.updateProgress(this.offset, this.total);
                if (this.paginationController.hasReachedEnd(this.offset, this.total)) {
                    this.isEndOfData = true;
                    this.scrollView.showEndResults();
                    console.log("exibindo mensagem na hora errada");
                    this.resultsInfoView.showAllresults(this.total);
                }
            }
            catch (error) {
                console.error("Erro ao atualizar conteúdo:", error);
            }
            finally {
                this.loadingUI.enableUI();
                this.scroll.unlock();
                this.scrollView.hideLoading();
            }
        });
    }
    inicializar() {
        window.addEventListener("pageshow", () => {
            if (!this.initialLoadDone) {
                this.updateContent(this.currentType, this.currentTerm, true);
                this.initialLoadDone = true;
            }
        }, { once: true });
        this.enableEventsSearch();
        this.scroll.start();
        this.enableClickEventsOnCards();
        this.openfavoritesPage();
        this.setInitialFilter(this.currentType);
        this.resetSearch();
        this.enableFavoriteClickEvent();
        this.eventBackToHome();
    }
}
