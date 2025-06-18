var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Renderer } from "../views/render-data.js";
import { consumeAPI } from "../services/request-services.js";
import { InfiniteScroll } from "../utils/infinitescroll-utils.js";
import { obterOrderBy } from "../utils/orderby-utils.js";
export class ControllerApi {
    constructor(container, tipoAtual) {
        this.container = container;
        this.tipoAtual = tipoAtual;
        this.offset = 0;
        this.total = 0;
        this.carregando = false;
        this.fimDosDados = false;
        this.resultadosPorPagina = 10;
        this.termoAtual = '';
        this.ordemAtual = '';
        this.renderer = new Renderer(container, tipoAtual);
    }
    adicionarEventos() {
        const btnFiltros = Array.from(document.querySelectorAll('.filtro'));
        const btnBuscar = document.querySelector('#buscar');
        const inputBusca = document.querySelector('#search');
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
        btnBuscar.addEventListener('click', () => {
            if (inputBusca) {
                this.termoAtual = inputBusca.value.trim();
                const selectOrdenacao = document.querySelector('#ordenacao');
                const valorOrdenacao = (selectOrdenacao === null || selectOrdenacao === void 0 ? void 0 : selectOrdenacao.value) || '';
                this.ordemAtual = obterOrderBy(this.tipoAtual, valorOrdenacao);
                this.atualizarConteudo(this.tipoAtual, this.termoAtual, true);
            }
        });
    }
    adicionarEventosDeCliqueNosCards() {
        const cards = document.querySelectorAll('.cards');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                if (id) {
                    window.location.href = `detail.html?id=${id}`;
                }
            });
        });
    }
    atualizarConteudo(tipo_1, termo_1) {
        return __awaiter(this, arguments, void 0, function* (tipo, termo, limpar = false) {
            var _a;
            this.adicionarEventosDeCliqueNosCards();
            if (this.carregando || this.fimDosDados)
                return;
            if (limpar) {
                this.renderer.limpar();
                this.offset = 0;
                this.fimDosDados = false;
                this.scroll.unlock();
            }
            this.carregando = true;
            try {
                const total = yield consumeAPI(tipo, termo, this.offset, this.resultadosPorPagina, this.ordemAtual, this.renderer);
                this.total = total;
                this.offset += this.resultadosPorPagina;
                if (this.offset >= this.total) {
                    this.fimDosDados = true;
                }
                else {
                    (_a = this.scroll) === null || _a === void 0 ? void 0 : _a.unlock();
                }
            }
            catch (error) {
                console.error('Erro ao atualizar conteúdo:', error);
            }
            finally {
                this.carregando = false;
            }
        });
    }
    inicializar() {
        this.adicionarEventos();
        this.scroll = new InfiniteScroll(() => {
            this.atualizarConteudo(this.tipoAtual, this.termoAtual);
        }, this.container);
        this.scroll.startEvent();
        this.atualizarConteudo(this.tipoAtual, '');
    }
}
