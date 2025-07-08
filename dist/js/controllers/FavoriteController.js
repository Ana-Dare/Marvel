export class favoriteController {
    constructor(renderFavorite) {
        this.renderFavorite = renderFavorite;
    }
    initialize() {
        this.renderFavorite.renderitemFavorites();
    }
}
