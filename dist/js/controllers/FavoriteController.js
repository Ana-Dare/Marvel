import { removeItemfavorite } from "../utils/localStorage.js";
export class favoriteController {
    constructor(renderFavorite) {
        this.renderFavorite = renderFavorite;
    }
    removeItemPageFavorite() {
        this.renderFavorite.container.addEventListener('click', (event) => {
            const target = event.target;
            const btn = target.closest('.favorite');
            if (btn) {
                const card = btn.closest('.item-container');
                const id = card === null || card === void 0 ? void 0 : card.dataset.id;
                const type = card === null || card === void 0 ? void 0 : card.dataset.type;
                if (id && type) {
                    removeItemfavorite('favorite', type, id);
                    card.remove();
                }
            }
        });
    }
    initialize() {
        this.renderFavorite.renderitemFavorites();
        this.removeItemPageFavorite();
    }
}
