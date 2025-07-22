import { requestCharactersById } from "../services/requests/CharactersById.js";
import { RenderCharacters } from "../views/Render/charactersRender.js";
import { requestComicsById } from "../services/requests/ComicsById.js";
import { RenderComics } from "../views/Render/comicsRender.js";
import { requestSeriesById } from "../services/requests/SeriesById.js";
import { RenderSeries } from "../views/Render/seriesRender.js";
import { DataApi } from "../interfaces/requestInterface.js";
import { setItemFavorite } from "../utils/localStorage.js";
import { removeItemfavorite } from "../utils/localStorage.js";
import { ObjectFavoriteInterface } from "../interfaces/favoriteInterface.js";
import { isItemFavorite } from "../utils/localStorage.js";
import { ScrollView } from "../views/Scroll/scrollView.js";

export class DetailController {
  private scrollView: ScrollView;
  constructor(
    private renderCharacters: RenderCharacters,
    private renderComics: RenderComics,
    private renderSeries: RenderSeries
  ) {
    this.scrollView = new ScrollView();
  }

  private openfavoritespage(): void {
    const btnPageFavorite = document.querySelector(
      "#favorite"
    ) as HTMLButtonElement;
    btnPageFavorite.addEventListener("click", () => {
      window.location.href = "favorite.html";
    });
  }

  private enableEventClickFavorite(item: DataApi) {
    const type = item.currentType;
    const id = item.id.toString() as string;
    const name = item.name as string;
    const title = item.title as string;
    const imagem =
      `${item.thumbnail.path}.${item.thumbnail.extension}` as string;
    const btnDetailFavorite = document.querySelector(
      ".favorite"
    ) as HTMLButtonElement;
    const imageBtnCardFavorite = btnDetailFavorite.querySelector(
      ".image-btn-card"
    ) as HTMLImageElement;

    if (isItemFavorite("favorite", type, id)) {
      imageBtnCardFavorite.src = "../img/suit-heart-fill.svg";
    } else {
      imageBtnCardFavorite.src = "../img/suit-heart.svg";
    }
    btnDetailFavorite.addEventListener("click", () => {
      id && type && btnDetailFavorite.classList.toggle("favorited");
      if (btnDetailFavorite.classList.contains("favorited")) {
        const objectFavorite: ObjectFavoriteInterface = {
          [type]: {
            [id]: {
              name,
              title,
              imagem,
            },
          },
        };

        setItemFavorite("favorite", objectFavorite);
        imageBtnCardFavorite.src = "../img/suit-heart-fill.svg";
      } else {
        removeItemfavorite("favorite", type, id);
        imageBtnCardFavorite.src = "../img/suit-heart.svg";
      }
    });
  }

  private eventBackToHome() {
    const logoMarvel = document.querySelector(".logo-marvel") as HTMLDivElement;
    logoMarvel.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }

  private handleTabMenu(menuId: string) {
    const menu = document.getElementById(menuId);
    if (!menu) return;

    const buttons = menu.querySelectorAll<HTMLButtonElement>('button');
    const sections = document.querySelectorAll<HTMLElement>('.section');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.target;
        if (!target) return;

        // Ativa a seção correta
        sections.forEach((section) => {
          const isTarget = section.id === `section-${target}`;
          section.classList.toggle('show', isTarget);
        });

        // Atualiza botão ativo
        buttons.forEach((btn) => {
          btn.classList.toggle('show', btn === button);
        });
      });
    });
  }


  public async initialize() {
    const container = document.querySelector(".detail") as HTMLDivElement;
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const id = params.get("id");

    if (!type || !id) {
      throw new Error("Parâmetros inválidos.");
    }
    try {
      switch (type) {
        case "characters":
          container.classList.remove("visible");
          this.scrollView.showLoading();
          try {
            const character = await requestCharactersById(id);
            if (character) this.renderCharacters.renderCharacters(character);
            character.currentType = "characters";
            this.enableEventClickFavorite(character);
            this.scrollView.hideLoading();
            container.classList.add("visible");
          } catch (error) {
            console.log("Erro ao buscar personagem", error);
          } finally {
            this.scrollView.hideLoading();
          }
          break;

        case "comics":
          container.classList.remove("visible");
          this.scrollView.showLoading();
          try {
            const comics = await requestComicsById(id);
            if (comics) this.renderComics.renderComics(comics);
            comics.currentType = "comics";
            this.enableEventClickFavorite(comics);
            this.scrollView.hideLoading();
            container.classList.add("visible");
          } catch (error) {
            console.log("Erro ao buscar quadrinho", error);
          } finally {
            this.scrollView.hideLoading();
          }
          break;

        case "series":
          container.classList.remove("visible");
          this.scrollView.showLoading();
          try {
            const series = await requestSeriesById(id);
            if (series) this.renderSeries.renderSeries(series);
            series.currentType = "series";
            this.enableEventClickFavorite(series);
            this.scrollView.hideLoading();
            container.classList.add("visible");
          } catch (error) {
            console.log("Erro ao buscar quadrinho", error);
          } finally {
            this.scrollView.hideLoading();
          }
          break;

        default:
          console.warn("Tipo inválido:", type);
      }
    } catch (e) {
      console.error("Erro ao carregar os dados:", e);
    }
    this.openfavoritespage();
    this.eventBackToHome();
    this.handleTabMenu('menu');
  }
}
