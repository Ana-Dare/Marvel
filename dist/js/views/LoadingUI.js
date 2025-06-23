export class LoadingUI {
    constructor() {
        this.elementsToDisable = [
            document.querySelector('#buscar'),
            document.querySelector('#search'),
            document.querySelector('#ordenacao'),
            document.querySelector('#personagens'),
            document.querySelector('#series'),
            document.querySelector('#quadrinhos')
        ].filter(Boolean);
    }
    disableUI() {
        this.elementsToDisable.forEach(el => el.disabled = true);
    }
    enableUI() {
        this.elementsToDisable.forEach(el => el.disabled = false);
    }
}
