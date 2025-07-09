import { RenderitemFavorites } from "../views/Render/favoritesRender.js";
import { removeItemfavorite } from "../utils/localStorage.js";

export class favoriteController {
    constructor(
        private renderFavorite: RenderitemFavorites
    ) {}

    private removeItemPageFavorite() {
        this.renderFavorite.container.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const btn = target.closest('.favorite') as HTMLElement;

        if (btn) {
        const card = btn.closest('.item-container') as HTMLElement;
        const id = card?.dataset.id;
        const type = card?.dataset.type;

        if (id && type) {
        removeItemfavorite('favorite', type, id);
        card.remove();
      }
    }
  });
}

    public initialize() {
        this.renderFavorite.renderitemFavorites();
        this.removeItemPageFavorite();
        
    }
}