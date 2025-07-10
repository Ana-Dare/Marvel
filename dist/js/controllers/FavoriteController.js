import { removeItemfavorite } from "../utils/localStorage.js";
export class favoriteController {
    constructor(renderFavorite, container) {
        this.renderFavorite = renderFavorite;
        this.container = container;
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
    enableEventsDeCliqueNosCards() {
        if (!this.container)
            return;
        this.container.addEventListener("click", (e) => {
            console.log('clicado');
            const target = e.target;
            if (target.closest(".favorite"))
                return;
            const card = target.closest(".item-container");
            if (card && card instanceof HTMLElement) {
                const id = card.dataset.id;
                const type = card.dataset.type;
                if (id && type) {
                    window.location.href = `${type}.html?type=${type}&id=${id}`;
                }
            }
        });
    }
    initialize() {
        this.enableFilterCurrentType();
        const btnDefault = document.querySelector('[data-tipo="characters"]');
        btnDefault === null || btnDefault === void 0 ? void 0 : btnDefault.classList.add("ativo");
        this.renderFavorite.renderitemFavorites('characters');
        this.removeItemPageFavorite();
        this.enableEventsDeCliqueNosCards();
    }
}
