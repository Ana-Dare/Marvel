export class LoadingUI {
    constructor() {
        this.elementsToDisable = [
            document.querySelector("#buscar"),
            document.querySelector("#search"),
            document.querySelector("#selec-order"),
            document.querySelector("#personagens"),
            document.querySelector("#series"),
            document.querySelector("#quadrinhos"),
            document.querySelector("#reset-search"),
        ].filter(Boolean);
        this.logoMarvel = document.querySelector('.logo-marvel');
    }
    disableUI() {
        this.elementsToDisable.forEach((el) => (el.disabled = true));
        this.logoMarvel.style.pointerEvents = 'none';
    }
    enableUI() {
        this.elementsToDisable.forEach((el) => (el.disabled = false));
        this.logoMarvel.style.pointerEvents = 'auto';
    }
}
