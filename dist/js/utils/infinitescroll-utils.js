var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class InfiniteScroll {
    constructor(callback, container, scrollOffset = 100) {
        this.callback = callback;
        this.scrollOffset = scrollOffset;
        this.container = container;
        this.message = document.querySelector('#messageLoading');
        this.inputSearch = document.querySelector('#search');
        this.btnSearch = document.querySelector('#buscar');
        this.btnPersonagem = document.querySelector('#personagens');
        this.btnSerie = document.querySelector('#series');
        this.btnQuadrinhos = document.querySelector('#quadrinhos');
        this.btnOrdenacao = document.querySelector('#ordenacao');
    }
    startEvent() {
        window.addEventListener('scroll', () => __awaiter(this, void 0, void 0, function* () {
            if (this.isLoading)
                return;
            const isNearPageEnd = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - this.scrollOffset);
            if (isNearPageEnd) {
                this.isLoading = true;
                yield this.callback();
                this.isLoading = false;
            }
        }));
    }
    toggleButtons(disabled) {
        this.btnSearch && (this.btnSearch.disabled = disabled);
        this.btnPersonagem && (this.btnPersonagem.disabled = disabled);
        this.btnSerie && (this.btnSerie.disabled = disabled);
        this.btnQuadrinhos && (this.btnQuadrinhos.disabled = disabled);
        this.btnSearch && (this.btnSearch.disabled = disabled);
        this.btnSearch && (this.btnSearch.disabled = disabled);
        this.btnOrdenacao && (this.btnOrdenacao.disabled = disabled);
        this.inputSearch && (this.inputSearch.disabled = disabled);
    }
    unlock() {
        this.isLoading = false;
        this.message.style.display = 'none';
        this.toggleButtons(false);
    }
    lock() {
        this.isLoading = true;
        this.message.style.display = 'block';
        this.toggleButtons(true);
    }
}
