import { RenderitemFavorites } from "../views/Render/favoritesRender.js";
import { removeItemfavorite } from "../utils/localStorage.js";
import { ContentType } from "../interfaces/requestInterface.js";
import { ScrollView } from "../views/Scroll/scrollView.js";


export class favoriteController {
    constructor(
      private renderFavorite: RenderitemFavorites,
      private container: HTMLElement,
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

    private enableEventsDeCliqueNosCards() {
    if (!this.container) return;
    this.container.addEventListener("click", (e) => {
      console.log('clicado');
      
      const target = e.target as HTMLElement;
      if (target.closest(".favorite")) return;
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

    public initialize() {
      this.enableFilterCurrentType();
      const btnDefault = document.querySelector('[data-tipo="characters"]');
      btnDefault?.classList.add("ativo");
      this.renderFavorite.renderitemFavorites('characters');
      this.removeItemPageFavorite();
      this.enableEventsDeCliqueNosCards();
        
    }
}