var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Renderer } from "../views/renderData.js";
import { obterOrderBy } from "../utils/orderby-utils.js";
import { ScrollDetector } from "./ScrollDetector .js";
import { ScrollView } from "../views/scrollView.js";
import { LoadingUI } from "../views/loadingUI.js";
import { mapApiResults } from "../mappers/mapHomeResults.js";
import { fetchFromAPI } from "../services/requestApi.js";
import { ResultsInfoView } from "../views/resultsInfo.js";
import { cacheService } from "../models/cache.js";
import { createUrl } from "../utils/createurl-utils.js";
const btnFiltros = Array.from(document.querySelectorAll('.filtro'));
const btnBuscar = document.querySelector('#buscar');
const inputBusca = document.querySelector('#search');
export class ControllerApi {
    constructor(container, tipoAtual) {
        this.container = container;
        this.tipoAtual = tipoAtual;
        this.offset = 0;
        this.total = 0;
        this.fimDosDados = false;
        this.resultadosPorPagina = 10;
        this.termoAtual = '';
        this.ordemAtual = '';
        this.renderer = new Renderer(container, tipoAtual);
        this.scrollView = new ScrollView();
        this.loadingUI = new LoadingUI();
        this.resultsInfoView = new ResultsInfoView();
        this.scroll = new ScrollDetector(() => __awaiter(this, void 0, void 0, function* () {
            if (this.fimDosDados)
                return;
            this.scroll.lock();
            this.scrollView.showLoading();
            yield this.atualizarConteudo(this.tipoAtual, this.termoAtual);
            this.scroll.unlock();
            this.scrollView.hideLoading();
        }));
    }
    adicionarEventos() {
        btnFiltros.forEach(btn => {
            btn.addEventListener('click', e => {
                const target = e.currentTarget;
                btnFiltros.forEach(btn => btn.classList.remove('ativo'));
                target.classList.add('ativo');
                const tipo = target.dataset.tipo;
                if (tipo) {
                    this.tipoAtual = tipo;
                    this.renderer.mudarTipo(tipo);
                }
            });
        });
        btnBuscar.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            if (inputBusca) {
                const termoDigitado = inputBusca.value.trim();
                if (!termoDigitado) {
                    alert('Digite algo!');
                    return;
                }
                this.termoAtual = termoDigitado;
                const selectOrdenacao = document.querySelector('#ordenacao');
                const valorOrdenacao = (selectOrdenacao === null || selectOrdenacao === void 0 ? void 0 : selectOrdenacao.value) || '';
                this.ordemAtual = obterOrderBy(this.tipoAtual, valorOrdenacao);
                this.scroll.lock();
                this.scrollView.showLoading();
                yield this.atualizarConteudo(this.tipoAtual, this.termoAtual, true);
            }
        }));
    }
    adicionarEventosDeCliqueNosCards() {
        if (!this.container)
            return;
        this.container.addEventListener('click', (e) => {
            const card = e.target.closest('.item-container');
            if (card && card instanceof HTMLElement) {
                const id = card.dataset.id;
                if (id) {
                    console.log('Card clicado!', card);
                    console.log('ID do card:', id);
                    window.location.href = `detail.html?id=${id}`;
                }
            }
        });
    }
    obterDados(tipo, termo) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = createUrl(tipo, termo, this.offset, this.resultadosPorPagina, this.ordemAtual);
            const cache = cacheService.get(url);
            if (cache)
                return cache;
            const { dados } = yield fetchFromAPI(tipo, termo, this.offset, this.resultadosPorPagina, this.ordemAtual);
            const total = dados.data.total;
            const results = dados.data.results;
            const itens = mapApiResults(results, tipo);
            cacheService.set(url, { itens, total });
            return { itens, total };
        });
    }
    atualizarConteudo(tipo_1, termo_1) {
        return __awaiter(this, arguments, void 0, function* (tipo, termo, limpar = false) {
            this.loadingUI.disableUI();
            this.scrollView.HideEndResults();
            if (limpar) {
                this.renderer.limpar();
                this.offset = 0;
                this.fimDosDados = false;
            }
            if (this.fimDosDados) {
                this.resultsInfoView.showAllLoaded(this.total);
                this.loadingUI.enableUI();
                return;
            }
            try {
                const { itens, total } = yield this.obterDados(tipo, termo);
                if (this.offset === 0)
                    this.renderer.limpar();
                itens.forEach(item => this.renderer.render(item));
                this.total = total;
                this.offset += this.resultadosPorPagina;
                this.resultsInfoView.updateProgress(this.offset, this.total);
                if (this.offset >= this.total) {
                    this.fimDosDados = true;
                    this.scrollView.showEndResults();
                    this.resultsInfoView.showAllresults(this.total);
                }
            }
            catch (error) {
                console.error('Erro ao atualizar conteúdo:', error);
            }
            finally {
                this.loadingUI.enableUI();
                this.scroll.unlock();
                this.scrollView.hideLoading();
            }
        });
    }
    inicializar() {
        this.adicionarEventos();
        this.scroll.start();
        this.adicionarEventosDeCliqueNosCards();
        this.atualizarConteudo(this.tipoAtual, '');
    }
}
