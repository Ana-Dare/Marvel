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
    enableFilterCurrentType() {
        const btnFilters = document.querySelectorAll('.filtro');
        btnFilters.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget;
                const type = target.dataset.tipo;
                if (!type)
                    return;
                btnFilters.forEach(b => b.classList.remove('ativo'));
                target.classList.add('ativo');
                switch (type) {
                    case "characters":
                        this.renderFavorite.renderitemFavorites("characters");
                        break;
                    case "comics":
                        this.renderFavorite.renderitemFavorites("comics");
                        break;
                    case "series":
                        this.renderFavorite.renderitemFavorites("series");
                        break;
                    default:
                        console.warn("Tipo inválido:", type);
                        break;
                }
            });
        });
    }
    initialize() {
        this.enableFilterCurrentType();
        this.renderFavorite.renderitemFavorites('characters');
        this.removeItemPageFavorite();
    }
}
