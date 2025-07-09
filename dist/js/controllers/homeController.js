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
import { fetchFromAPI } from "../services/requests/Api.js";
import { ResultsInfoView } from "../views/Scroll/resultsInfo.js";
import { cacheService } from "../models/cache.js";
import { createUrl } from "../utils/createurl-utils.js";
import { ContentDataFetcher } from "../services/contentDataFetcher.js";
import { PaginationController } from "../services/pagination.js";
import { ContentDisplay } from "../views/contentDisplay.js";
import { setItemFavorite } from "../utils/localStorage.js";
import { removeItemfavorite } from "../utils/localStorage.js";
const btnFilters = Array.from(document.querySelectorAll(".filtro"));
const btnSearch = document.querySelector("#buscar");
const inputSearch = document.querySelector("#search");
const orderSelect = document.querySelector("#ordenacao");
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
    enableEvents() {
        btnFilters.forEach((btn) => {
            btn.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
                const target = e.currentTarget;
                btnFilters.forEach((btn) => btn.classList.remove("ativo"));
                target.classList.add("ativo");
                const tipo = target.dataset.tipo;
                if (tipo) {
                    const inputTerm = inputSearch.value.trim();
                    this.currentTerm = inputTerm;
                    this.displayContent.clear();
                    this.resultsInfoView.hideResults();
                    this.currentType = tipo;
                    this.renderer.mudarTipo(tipo);
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
                    alert("Digite algo!");
                    return;
                }
                this.currentTerm = inputTerm;
                this.displayContent.clear();
                this.resultsInfoView.hideResults();
                const sortValue = (orderSelect === null || orderSelect === void 0 ? void 0 : orderSelect.value) || "";
                this.currentOrder = obterOrderBy(this.currentType, sortValue);
                yield this.updateContent(this.currentType, this.currentTerm, true);
            }
        }));
    }
    enableEventsDeCliqueNosFavoritos() {
        this.container &&
            this.container.addEventListener("click", (e) => {
                const target = e.target;
                const btn = target.closest(".favorite");
                const card = btn && btn.closest(".item-container");
                const id = card === null || card === void 0 ? void 0 : card.dataset.id;
                const type = card === null || card === void 0 ? void 0 : card.dataset.type;
                const name = card === null || card === void 0 ? void 0 : card.dataset.name;
                const title = card === null || card === void 0 ? void 0 : card.dataset.title;
                const imagem = `${card === null || card === void 0 ? void 0 : card.dataset.thumbnailPath}.${card === null || card === void 0 ? void 0 : card.dataset.thumbnailExtension}`;
                id && type && btn && btn.classList.toggle("active");
                if (btn === null || btn === void 0 ? void 0 : btn.classList.contains("active")) {
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
                    btn === null || btn === void 0 ? void 0 : btn.classList.remove("active");
                }
            });
    }
    openfavoritespage() {
        const btnPageFavorite = document.querySelector("#favorite");
        btnPageFavorite.addEventListener("click", () => {
            window.location.href = "pages/favorite.html";
        });
    }
    setInitialFilter(tipo) {
        btnFilters.forEach((btn) => {
            btn.classList.remove("ativo");
            if (btn.dataset.tipo === tipo) {
                btn.classList.add("ativo");
            }
        });
    }
    resetSearch() {
        const BtnResetSearch = document.querySelector("#deletar");
        BtnResetSearch.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            inputSearch.value = "";
            this.currentTerm = "";
            this.offset = 0;
            this.isEndOfData = false;
            this.currentType = "characters";
            this.renderer.mudarTipo("characters");
            this.offset = 0;
            this.limit = 10;
            this.total = 0;
            this.currentOrder = "";
            this.setInitialFilter("characters");
            yield this.updateContent("characters", "", true);
        }));
    }
    enableEventsDeCliqueNosCards() {
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
    getData(tipo, termo) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const url = createUrl(tipo, termo, this.offset, this.limit, this.currentOrder);
            console.log(url);
            try {
                const cache = cacheService.get(url);
                if (cache)
                    return cache;
                const { dados } = yield fetchFromAPI(tipo, termo, this.offset, this.limit, this.currentOrder);
                console.log('🔍 Resposta da API:', dados);
                const total = (_a = dados.data) === null || _a === void 0 ? void 0 : _a.total;
                const results = dados.data.results;
                const itens = mapApiResults(results, tipo);
                cacheService.set(url, { itens, total });
                return { itens, total };
            }
            catch (error) {
                console.error("Erro ao buscar dados:", error);
                throw error;
            }
        });
    }
    updateContent(tipo_1, termo_1) {
        return __awaiter(this, arguments, void 0, function* (tipo, termo, limpar = false) {
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
                const { itens, total } = yield this.dataFetcher.fetchContent(tipo, termo);
                this.displayContent.clearIfFirstPage(this.offset);
                this.displayContent.renderItems(itens);
                this.total = total;
                this.offset = this.paginationController.calculateNextOffset(this.offset);
                this.resultsInfoView.updateProgress(this.offset, this.total);
                if (this.paginationController.hasReachedEnd(this.offset, this.total)) {
                    this.isEndOfData = true;
                    this.scrollView.showEndResults();
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
        window.addEventListener('pageshow', () => {
            this.updateContent(this.currentType, this.currentTerm, true);
        });
        this.enableEvents();
        this.scroll.start();
        this.enableEventsDeCliqueNosCards();
        this.openfavoritespage();
        this.setInitialFilter(this.currentType);
        this.updateContent(this.currentType, "", false);
        this.resetSearch();
        this.enableEventsDeCliqueNosFavoritos();
    }
}
