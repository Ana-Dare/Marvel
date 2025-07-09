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

    private enableFilterCurrentType() {
    const btnFilters = document.querySelectorAll('.filtro');
    btnFilters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const type = target.dataset.tipo;
      if (!type) return;
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

    public initialize() {
      this.enableFilterCurrentType();
        this.renderFavorite.renderitemFavorites('characters');
        this.removeItemPageFavorite();
        
    }
}