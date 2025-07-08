export class ContentDisplay {
    constructor(renderer) {
        this.renderer = renderer;
    }
    clear() {
        this.renderer.limpar();
    }
    clearIfFirstPage(offset) {
        if (offset === 0) {
            this.renderer.limpar();
        }
    }
    renderItems(itens) {
        itens.forEach((item) => this.renderer.render(item));
    }
}
