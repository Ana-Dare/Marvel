import { RenderitemFavorites } from "../views/Render/favoritesRender.js"

export class favoriteController {
    constructor(
        private renderFavorite: RenderitemFavorites
    ) {}

    public initialize() {
        this.renderFavorite.renderitemFavorites()
    }
}