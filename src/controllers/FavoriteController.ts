import { RenderitemFavorites } from "../views/Render/favoritesRender.js";
import { removeItemfavorite } from "../utils/localStorage.js";

export class favoriteController {
    constructor(
        private renderFavorite: RenderitemFavorites
    ) {}

    private removeItemfavorite(item: RenderitemFavorites) {
        const btnCardFavorite = document.querySelector('.favorite');
        btnCardFavorite?.addEventListener('click', () => {

        })
    }

    public initialize() {
        this.renderFavorite.renderitemFavorites()
    }
}