type CallbackScroll = () => void;

export class InfiniteScroll {
    private scrollOffset: number;
    private callback: CallbackScroll;
    private isLoading: boolean;
    private message: HTMLElement;
    private container: HTMLElement;
    private btnOrdenacao: HTMLSelectElement | null;
    private inputSearch: HTMLButtonElement | null;
    private btnSearch: HTMLButtonElement | null;
    private btnPersonagem: HTMLButtonElement | null;
    private btnSerie: HTMLButtonElement | null;
    private btnQuadrinhos: HTMLButtonElement | null;


    constructor(callback: CallbackScroll, container: HTMLElement, scrollOffset: number = 100) {
        this.callback =  callback;
        this.scrollOffset = scrollOffset;
        this.container = container;
        this.message = document.querySelector('#messageLoading')!;
        this.inputSearch = document.querySelector('#search');
        this.btnSearch = document.querySelector('#buscar');
        this.btnPersonagem = document.querySelector('#personagens');
        this.btnSerie = document.querySelector('#series');
        this.btnQuadrinhos = document.querySelector('#quadrinhos');
        this.btnOrdenacao = document.querySelector('#ordenacao');
    }

    public startEvent() {
        window.addEventListener('scroll', () => {
            if (this.isLoading) return;
        const isNearPageEnd = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - this.scrollOffset);

            if (isNearPageEnd) {
                this.isLoading = true;
                this.callback();
            }
        });
    }

    private toggleButtons(disabled: boolean) {
        this.btnSearch && (this.btnSearch.disabled = disabled);
        this.btnPersonagem && (this.btnPersonagem.disabled = disabled);
        this.btnSerie && (this.btnSerie.disabled = disabled);
        this.btnQuadrinhos && (this.btnQuadrinhos.disabled = disabled);
        this.btnSearch && (this.btnSearch.disabled = disabled);
        this.btnSearch && (this.btnSearch.disabled = disabled);
        this.btnOrdenacao && (this.btnOrdenacao.disabled = disabled);
        this.inputSearch && (this.inputSearch.disabled = disabled);
    }

    public unlock() {
        this.isLoading = false;
        this.message.style.display = 'none';
        this.toggleButtons(false);
    }

    public lock() {
        this.isLoading = true;
        this.message.style.display = 'block';
        this.toggleButtons(true); 
    }

}

