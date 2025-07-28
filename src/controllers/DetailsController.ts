import { requestCharactersById } from "../services/requests/CharactersById.js";
import { RenderCharacters } from "../views/Render/charactersRender.js";
import { requestComicsById } from "../services/requests/ComicsById.js";
import { RenderComics } from "../views/Render/comicsRender.js";
import { requestSeriesById } from "../services/requests/SeriesById.js";
import { RenderSeries } from "../views/Render/seriesRender.js";
import {
  Characters,
  Comics,
  CurrentTypeInterface,
  DataApi,
} from "../interfaces/requestInterface.js";
import { setItemFavorite } from "../utils/localStorage.js";
import { removeItemfavorite } from "../utils/localStorage.js";
import { ObjectFavoriteInterface } from "../interfaces/favoriteInterface.js";
import { isItemFavorite } from "../utils/localStorage.js";
import { ScrollView } from "../views/Scroll/scrollView.js";
import { Series } from "../interfaces/requestInterface.js";

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

  private enableEventClickFavorite(item: DataApi, type: CurrentTypeInterface) {
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
      btnDetailFavorite.classList.add("favorited");
    } else {
      imageBtnCardFavorite.src = "../img/suit-heart.svg";
      btnDetailFavorite.classList.remove("favorited");
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

    const buttons = menu.querySelectorAll<HTMLButtonElement>("button");
    const sections = document.querySelectorAll<HTMLElement>(".section");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.target;
        if (!target) return;

        const targetSection = document.getElementById(
          `section-${target}`
        ) as HTMLDivElement;
        const isAlreadyVisible = targetSection.classList.contains("show");

        sections.forEach((section) => section.classList.remove("show"));
        buttons.forEach((btn) => btn.classList.remove("show"));

        if (!isAlreadyVisible) {
          targetSection.classList.add("show");
          button.classList.add("show");
        }
      });
    });
  }

  private async fetchDataAndRender(
    type: CurrentTypeInterface,
    id: string,
    request: (id: string) => Promise<Characters | Comics | Series | null>,
    render: (data: Characters | Comics | Series) => void,
    container: HTMLDivElement
  ) {
    container.classList.remove("visible");
    this.scrollView.showLoading();
    try {
      const data = await request(id);

      if (data) {
        render(data);
        this.enableEventClickFavorite(data, type);
        console.log(this.enableEventClickFavorite);
        this.scrollView.hideLoading();
        container.classList.add("visible");
      } else {
        console.warn(`Dados para ${type} com ID ${id} não encontrados.`);
      }
    } catch (error) {
      container.classList.add("visible");
      container.innerHTML = `
      <div class = 'no-more-results'>
        Erro ao buscar dados, tente novamente.
      </div>
      `;
      throw error;
    } finally {
      this.scrollView.hideLoading();
    }
  }

  public async initialize() {
    const container = document.querySelector(".detail") as HTMLDivElement;
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") as CurrentTypeInterface;
    const id = params.get("id");

    if (!type || !id) {
      throw new Error("Parâmetros inválidos.");
    }
    try {
      switch (type) {
        case "characters":
          await this.fetchDataAndRender(
            "characters",
            id,
            requestCharactersById,
            this.renderCharacters.renderCharacters,
            container
          );
          break;

        case "comics":
          await this.fetchDataAndRender(
            "comics",
            id,
            requestComicsById,
            this.renderComics.renderComics,
            container
          );
          break;

        case "series":
          await this.fetchDataAndRender(
            "series",
            id,
            requestSeriesById,
            this.renderSeries.renderSeries,
            container
          );
          break;
        default:
          console.warn("Tipo inválido:", type);
      }
    } catch (e) {
      console.error("Erro ao carregar os dados:", e);
    }
    this.openfavoritespage();
    this.eventBackToHome();
    this.handleTabMenu("menu");
  }
}
