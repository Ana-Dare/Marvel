export class ContentDisplay {
    constructor(renderer) {
        this.renderer = renderer;
    }
    clearIfFirstPage(offset) {
        if (offset === 0) {
            this.renderer.toClean();
        }
    }
    renderItems(itens) {
        itens.forEach((item) => this.renderer.render(item));
    }
}
