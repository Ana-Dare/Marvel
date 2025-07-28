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
        this.btnHomeFavorite = document.querySelector('.btn-favorite-home');
    }
    disableUI() {
        this.elementsToDisable.forEach((el) => (el.disabled = true));
        this.elementsToDisable.forEach((el) => (el.style.pointerEvents = 'none'));
        this.logoMarvel.style.pointerEvents = 'none';
        this.btnHomeFavorite.style.pointerEvents = 'none';
    }
    enableUI() {
        this.elementsToDisable.forEach((el) => (el.disabled = false));
        this.elementsToDisable.forEach((el) => (el.style.pointerEvents = 'auto'));
        this.logoMarvel.style.pointerEvents = 'auto';
        this.btnHomeFavorite.style.pointerEvents = 'auto';
    }
}
