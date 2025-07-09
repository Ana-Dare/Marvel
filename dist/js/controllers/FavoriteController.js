export class favoriteController {
    constructor(renderFavorite) {
        this.renderFavorite = renderFavorite;
    }
    removeItemfavorite(item) {
        const btnCardFavorite = document.querySelector('.favorite');
        btnCardFavorite === null || btnCardFavorite === void 0 ? void 0 : btnCardFavorite.addEventListener('click', () => {
        });
    }
    initialize() {
        this.renderFavorite.renderitemFavorites();
    }
}
