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
        window.addEventListener('scroll', () => {
            if (this.isLoading)
                return;
            const isNearPageEnd = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - this.scrollOffset);
            if (isNearPageEnd) {
                this.isLoading = true;
                this.callback();
            }
        });
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
