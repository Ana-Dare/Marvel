import { Renderer } from "../views/Render/homeRender.js";
import { CurrentTypeInterface } from "../interfaces/requestInterface.js";
import { obterOrderBy } from "../utils/orderby-utils.js";
import { ScrollDetector } from "./ScrollDetector .js";
import { ScrollView } from "../views/Scroll/scrollView.js";
import { LoadingUI } from "../views/Scroll/LoadingUI.js";
import { mapApiResults } from "../mappers/mapHomeResults.js";
import { fetchFromAPI } from "../services/requests/Api.js";
import { DataApi } from "../interfaces/requestInterface.js";
import { ResultsInfoView } from "../views/Scroll/resultsInfo.js";
import { cacheService } from "../models/cache.js";
import { createUrl } from "../utils/createurl-utils.js";
import { ContentDataFetcher } from "../services/contentDataFetcher.js";
import { PaginationController } from "../services/pagination.js";
import { ContentDisplay } from "../views/contentDisplay.js";
import { setItemFavorite } from "../utils/localStorage.js";
import { removeItemfavorite } from "../utils/localStorage.js";
import { ObjectFavoriteInterface } from "../interfaces/favoriteInterface.js";

const btnFilters = Array.from(
  document.querySelectorAll(".filtro")
) as HTMLElement[];
const btnSearch = document.querySelector("#buscar") as HTMLButtonElement;
const inputSearch = document.querySelector("#search") as HTMLInputElement;
const orderSelect = document.querySelector("#selec-order") as HTMLSelectElement;

export class ControllerApi {
  private offset: number = 0;
  private total: number = 0;
  private isEndOfData: boolean = false;
  private limit: number = 10;
  private renderer: Renderer;
  private currentTerm: string = "";
  private currentOrder: string = "";
  private scroll: ScrollDetector;
  private scrollView: ScrollView;
  private loadingUI: LoadingUI;
  private resultsInfoView: ResultsInfoView;
  private dataFetcher: ContentDataFetcher;
  private paginationController: PaginationController;
  private displayContent: ContentDisplay;

  constructor(
    public container: HTMLElement,
    private currentType: CurrentTypeInterface
  ) {
    this.renderer = new Renderer(container, currentType);
    this.scrollView = new ScrollView();
    this.loadingUI = new LoadingUI();
    this.resultsInfoView = new ResultsInfoView();
    this.dataFetcher = new ContentDataFetcher(this.getData.bind(this));
    this.paginationController = new PaginationController(this.limit);
    this.displayContent = new ContentDisplay(this.renderer);
    this.scroll = new ScrollDetector(async () => {
      if (this.isEndOfData) return;

      this.scroll.lock();
      this.scrollView.showLoading();

      await this.updateContent(this.currentType, this.currentTerm, false);

      this.scroll.unlock();
      this.scrollView.hideLoading();
    });
  }

  private enableEventsSearch() {
    btnFilters.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const target = e.currentTarget as HTMLElement;
        btnFilters.forEach((btn) => btn.classList.remove("ativo"));
        target.classList.add("ativo");

        const type = target.dataset.tipo as CurrentTypeInterface | undefined;
        if (type) {
          const inputTerm = inputSearch.value.trim();
          this.currentTerm = inputTerm;
          this.renderer.toClean();
          this.resultsInfoView.hideResults();
          this.currentType = type;
          this.renderer.changeType(type);
          const sortValue = orderSelect?.value || "";
          this.currentOrder = obterOrderBy(this.currentType, sortValue);
          await this.updateContent(this.currentType, this.currentTerm, true);
        }
      });
    });

    btnSearch.addEventListener("click", async () => {
      if (inputSearch) {
        const inputTerm = inputSearch.value.trim();
        if (!inputTerm) {
          return;
        }
        this.currentTerm = inputTerm;
        this.renderer.toClean();
        this.resultsInfoView.hideResults();
        const sortValue = orderSelect?.value || "";
        this.currentOrder = obterOrderBy(this.currentType, sortValue);
        await this.updateContent(this.currentType, this.currentTerm, true);
      }
    });

    inputSearch.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        btnSearch.click();
      }
    });

    orderSelect.addEventListener("change", async () => {
      const inputTerm = inputSearch.value.trim();
      this.currentTerm = inputTerm;
      this.renderer.toClean();
      this.resultsInfoView.hideResults();
      const sortValue = orderSelect?.value || "";
      this.currentOrder = obterOrderBy(this.currentType, sortValue);
      await this.updateContent(this.currentType, this.currentTerm, true);
    });
  }

  private eventBackToHome() {
    const logoMarvel = document.querySelector(".logo-marvel") as HTMLDivElement;
    logoMarvel.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }

  public enableFavoriteClickEvent() {
    this.container &&
      this.container.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const btn = target.closest(".favorite") as HTMLButtonElement;
        const card = btn && (btn.closest(".item-container") as HTMLElement);
        const id = card?.dataset.id as string;
        const type = card?.dataset.type as string;
        const name = card?.dataset.name as string;
        const imgBtnCard = btn?.querySelector(
          ".image-btn-card"
        ) as HTMLImageElement;
        const title = card?.dataset.title as string;
        const imagem =
          `${card?.dataset.thumbnailPath}.${card?.dataset.thumbnailExtension}` as string;
        id && type && btn && btn.classList.toggle("favorited");
        if (btn?.classList.contains("favorited")) {
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
          imgBtnCard.src = "./img/suit-heart-fill.svg";
        } else {
          removeItemfavorite("favorite", type, id);
          imgBtnCard.src = "./img/suit-heart.svg";
        }
      });
  }

  private openfavoritesPage(): void {
    const btnPageFavorite = document.querySelector(
      "#favorite"
    ) as HTMLButtonElement;
    btnPageFavorite.addEventListener("click", () => {
      window.location.href = "pages/favorite.html";
    });
  }

  private setInitialFilter(tipo: CurrentTypeInterface) {
    btnFilters.forEach((btn) => {
      btn.classList.remove("ativo");
      if (btn.dataset.tipo === tipo) {
        btn.classList.add("ativo");
      }
    });
  }

  private resetSearch() {
    const BtnResetSearch = document.querySelector(
      "#reset-search"
    ) as HTMLButtonElement;
    BtnResetSearch.addEventListener("click", async () => {
      inputSearch.value = "";
      this.currentTerm = "";
      this.offset = 0;
      this.isEndOfData = false;
      this.currentType = "characters";
      this.renderer.changeType("characters");
      this.offset = 0;
      this.limit = 10;
      this.total = 0;
      this.currentOrder = "";
      orderSelect.value = "Mais recente";
      this.setInitialFilter("characters");
      await this.updateContent("characters", "", true);
    });
  }

  private enableClickEventsOnCards() {
    if (!this.container) return;
    this.container.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.closest(".favorite")) return;
      const card = target.closest(".item-container");
      if (card && card instanceof HTMLElement) {
        const id = card.dataset.id;
        const type = card.dataset.type;
        if (id && type) {
          window.location.href = `pages/${type}.html?type=${type}&id=${id}`;
        }
      }
    });
  }

  public async getData(
    tipo: CurrentTypeInterface,
    termo: string
  ): Promise<{ itens: DataApi[]; total: number }> {
    const url = createUrl(
      tipo,
      termo,
      this.offset,
      this.limit,
      this.currentOrder
    );
    try {
      const cache = cacheService.get(url);
      if (cache) return cache;
      const { dados } = await fetchFromAPI(
        tipo,
        termo,
        this.offset,
        this.limit,
        this.currentOrder
      );
      const total = dados.data?.total;
      const results: DataApi[] = dados.data.results;
      const itens = mapApiResults(results, tipo);
      console.log("Resposta inesperada da API:", results);

      cacheService.set(url, { itens, total });
      return { itens, total };
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      const noMoreResults = document.querySelector(
        "#noMoreResults"
      ) as HTMLDivElement;
      noMoreResults.style.display = "block";
      noMoreResults.innerHTML = "Erro ao buscar dados, tente novamente.";
      throw error;
    }
  }

  public async updateContent(
    tipo: CurrentTypeInterface,
    termo: string,
    limpar: boolean = false
  ) {
    const sortValue = orderSelect?.value || "";
    this.currentOrder = obterOrderBy(this.currentType, sortValue);
    this.loadingUI.disableUI();
    this.scrollView.HideEndResults();
    this.scroll.lock();
    this.scrollView.showLoading();

    if (limpar) {
      this.offset = 0;
      this.isEndOfData = false;
    }
    if (this.isEndOfData) {
      this.resultsInfoView.showAllLoaded(this.total);
      this.loadingUI.enableUI();
      return;
    }
    try {
      const { itens, total } = await this.dataFetcher.fetchContent(tipo, termo);
      this.displayContent.clearIfFirstPage(this.offset);
      this.displayContent.renderItems(itens);
      this.total = total;
      this.offset = this.paginationController.calculateNextOffset(this.offset);
      this.resultsInfoView.updateProgress(this.offset, this.total);

      if (this.paginationController.hasReachedEnd(this.offset, this.total)) {
        this.isEndOfData = true;
        this.scrollView.showEndResults();
        console.log("exibindo mensagem na hora errada");
        this.resultsInfoView.showAllresults(this.total);
      }
    } catch (error) {
      console.error("Erro ao atualizar conteúdo:", error);
    } finally {
      this.loadingUI.enableUI();
      this.scroll.unlock();
      this.scrollView.hideLoading();
    }
  }

  public inicializar() {
    window.addEventListener("pageshow", () => {
      this.updateContent(this.currentType, this.currentTerm, true);
    });
    this.enableEventsSearch();
    this.scroll.start();
    this.enableClickEventsOnCards();
    this.openfavoritesPage();
    this.setInitialFilter(this.currentType);
    this.updateContent(this.currentType, "", false);
    this.resetSearch();
    this.enableFavoriteClickEvent();
    this.eventBackToHome();
  }
}
