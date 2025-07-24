import { RenderitemFavorites } from "../views/Render/favoritesRender.js";
import { removeItemfavorite } from "../utils/localStorage.js";
import { CurrentTypeInterface } from "../interfaces/requestInterface.js";


export class favoriteController {
  private selectedType: CurrentTypeInterface = "characters";
  private currentTerm: string = "";
  private btnFilters = document.querySelectorAll(".filtro");

  constructor(
    private renderFavorite: RenderitemFavorites,
    private container: HTMLElement
  ) {}

  private removeItemPageFavorite() {
    this.renderFavorite.container.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const btn = target.closest(".favorite") as HTMLElement;

      if (btn) {
        const card = btn.closest(".item-container") as HTMLElement;
        const id = card?.dataset.id;
        const type = card?.dataset.type;

        if (id && type) {
          removeItemfavorite("favorite", type, id);
          card.remove();
        }
      }
    });
  }

  private enableFilterOnCurrentType() {
    this.btnFilters.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement;
        const type = target.dataset.tipo;
        if (!type) return;
        this.btnFilters.forEach((b) => b.classList.remove("ativo"));
        target.classList.add("ativo");

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

  private enableClickEventOnCards() {
    if (!this.container) return;
    this.container.addEventListener("click", (e) => {
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

  private enableSearchEvent() {
    const inputSearch = document.querySelector(
      "#input-search-favorite"
    ) as HTMLInputElement;
    const btnSearch = document.querySelector(
      "#btn-search-favorite"
    ) as HTMLButtonElement;

    this.btnFilters.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const target = e.currentTarget as HTMLElement;
        this.selectedType = target.dataset.tipo as CurrentTypeInterface;
      });
    });

    btnSearch.addEventListener("click", () => {
      this.currentTerm = inputSearch.value.trim();
      const objectString = localStorage.getItem("favorite") || "{}";
      const favorites: Record<
        string,
        Record<string, { name: string; title: string; imagem: string }>
      > = JSON.parse(objectString);

      const selectedFavorites = favorites[this.selectedType] || {};

      const filtered = Object.fromEntries(
        Object.entries(selectedFavorites).filter(([id, item]) =>
          (item.name || item.title).toLowerCase().includes(this.currentTerm)
        )
      );
      this.renderFavorite.renderitemFavorites(this.selectedType, filtered);
    });

    inputSearch.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        btnSearch.click();
      }
    });
  }

  private resetSearch() {
    const inputSearch = document.querySelector(
      "#input-search-favorite"
    ) as HTMLInputElement;
    const btnResetSearch = document.querySelector(
      "#deletar-search-favorite"
    ) as HTMLButtonElement;
    btnResetSearch.addEventListener("click", () => {
      this.renderFavorite.renderitemFavorites(this.selectedType);
      inputSearch.value = "";
      this.currentTerm = "";
    });
  }

  private eventBackToHome() {
    const logoMarvel = document.querySelector(".logo-marvel") as HTMLDivElement;
    logoMarvel.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }

  public initialize() {
    this.enableFilterOnCurrentType();
    const btnDefault = document.querySelector(
      '[data-tipo="characters"]'
    ) as HTMLButtonElement;
    btnDefault.classList.add("ativo");
    this.renderFavorite.renderitemFavorites("characters");
    this.enableSearchEvent();
    this.removeItemPageFavorite();
    this.enableClickEventOnCards();
    this.resetSearch();
    this.eventBackToHome();
  }
}
