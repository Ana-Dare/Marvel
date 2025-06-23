var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Renderer } from "../views/RenderData.js";
import { consumeAPI } from "../services/request-services.js";
import { obterOrderBy } from "../utils/orderby-utils.js";
import { ScrollDetector } from "./ScrollDetector .js";
import { ScrollView } from "../views/ScrollDetectorView.js";
import { LoadingUI } from "../views/LoadingUI.js";
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
        this.resultsInfo = document.querySelector('#resultsInfo');
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
                this.resultsInfo.textContent = `Showing all ${this.total} results.`;
                this.loadingUI.enableUI();
                return;
            }
            try {
                const total = yield consumeAPI(tipo, termo, this.offset, this.resultadosPorPagina, this.ordemAtual, this.renderer);
                this.total = total;
                this.offset += this.resultadosPorPagina;
                this.resultsInfo.textContent = `Showing ${Math.min(this.offset, this.total)} of ${this.total} results.`;
                if (this.offset >= this.total) {
                    this.fimDosDados = true;
                    this.scrollView.showEndResults();
                    this.resultsInfo.textContent = `All ${this.total} results loaded.`;
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
