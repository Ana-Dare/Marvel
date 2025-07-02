import { Renderer } from "../views/Render/homeRender.js"; 
import { ContentType} from "../interfaces/requestInterface.js";
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

const btnFilters = Array.from(document.querySelectorAll('.filtro')) as HTMLElement[];
const btnSearch = document.querySelector('#buscar') as HTMLButtonElement;
const inputSearch = document.querySelector('#search') as HTMLInputElement;
const orderSelect = document.querySelector('#ordenacao') as HTMLSelectElement;

export class ControllerApi {
    private offset: number = 0; 
    private total: number = 0; 
    private isEndOfData: boolean = false; 
    private limit: number = 10; 
    private renderer: Renderer; 
    private currentTerm: string = ''; 
    private currentOrder: string = ''; 
    private scroll: ScrollDetector; 
    private scrollView: ScrollView; 
    private loadingUI: LoadingUI;
    private resultsInfoView: ResultsInfoView;
    private dataFetcher: ContentDataFetcher;
    private paginationController: PaginationController;
    private displayContent: ContentDisplay;

  constructor(
    public container: HTMLElement, 
    private currentType: ContentType
  ) 
  {
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

      await this.updateContent(this.currentType, this.currentTerm); 

      this.scroll.unlock(); 
      this.scrollView.hideLoading();
    });
  }

  private enableEvents() { 
    btnFilters.forEach(btn => {
      btn.addEventListener('click', async e => {
        const target = e.currentTarget as HTMLElement; 
          btnFilters.forEach(btn => btn.classList.remove('ativo'));
          target.classList.add('ativo');

        const tipo = target.dataset.tipo as ContentType | undefined; 
          if (tipo) {
            const inputTerm = inputSearch.value.trim();
            this.currentTerm = inputTerm;
            this.currentType = tipo; 
            this.renderer.mudarTipo(tipo); 
            const sortValue = orderSelect?.value || ''; 
            this.currentOrder = obterOrderBy(this.currentType, sortValue);
            await this.updateContent(this.currentType, this.currentTerm, true); 
          }
      });
    });

    btnSearch.addEventListener('click', async () => { 
      if (inputSearch) {
        const inputTerm = inputSearch.value.trim(); 
      if (!inputTerm) {
        alert('Digite algo!') 
        return;
    }
      this.currentTerm = inputTerm; 
     
      const sortValue = orderSelect?.value || '';
      this.currentOrder = obterOrderBy(this.currentType, sortValue); 

      this.scroll.lock(); 
      this.scrollView.showLoading(); 

      await this.updateContent(this.currentType, this.currentTerm, true); 
      }
    });
  }

private setInitialFilter(tipo: ContentType) {
  btnFilters.forEach(btn => {
    btn.classList.remove('ativo');
    if (btn.dataset.tipo === tipo) {
      btn.classList.add('ativo');
    }
  });
}

private resetSearch() {
  const BtnResetSearch = document.querySelector('#deletar') as HTMLButtonElement;
  BtnResetSearch.addEventListener('click' ,async () => {
    inputSearch.value = '';
    this.currentTerm = '';
    this.offset = 0;
    this.isEndOfData = false;
    this.currentType = "characters";
    this.renderer.mudarTipo("characters");
    this.offset = 0;
    this.limit =  10;
    this.total = 0;
    this.currentOrder = '';
    this.setInitialFilter("characters");
    await this.updateContent("characters", '', true);
  })
}

private enableEventsDeCliqueNosCards() { 
    if (!this.container) return; 
    this.container.addEventListener('click', (e) => { 
      const card = (e.target as HTMLElement).closest('.item-container'); 
    if (card && card instanceof HTMLElement) {  
      const id = card.dataset.id; 
      const type = card.dataset.type;
      if (id && type) {
          window.location.href = `pages/${type}.html?type=${type}&id=${id}`;
      }
    }
  });
}

public async getData(tipo: ContentType, termo: string): Promise<{ itens: DataApi[]; total: number }> { 
  const url = createUrl(tipo, termo, this.offset, this.limit, this.currentOrder); 
  console.log(url);

  try {  
  const cache = cacheService.get(url); 
  if (cache) return cache; 

  const { dados } = await fetchFromAPI(tipo, termo, this.offset, this.limit, this.currentOrder); 
  const total = dados.data.total; 
  const results:DataApi[] = dados.data.results;
  const itens = mapApiResults(results, tipo); 

  cacheService.set(url, { itens, total }); 
  return { itens, total }; 

  } catch  (error) {
    console.error("Erro ao buscar dados:", error);
    throw error; 
  }
}

  public async updateContent(tipo: ContentType, termo: string, limpar: boolean = false) {
    this.loadingUI.disableUI(); 
    this.scrollView.HideEndResults();

      if (limpar) { 
        this.offset = 0
        this.isEndOfData = false; 
      }
      if (this.isEndOfData) { 
        this.resultsInfoView.showAllLoaded(this.total) 
        this.loadingUI.enableUI(); 
        return;
      }
    try {
    const { itens, total }= await this.dataFetcher.fetchContent(tipo, termo);

    this.displayContent.clearIfFirstPage(this.offset);
    this.displayContent.renderItems(itens);
    this.total = total; 
    this.offset = this.paginationController.calculateNextOffset(this.offset); 
    this.resultsInfoView.updateProgress(this.offset, this.total); 

    if(this.paginationController.hasReachedEnd(this.offset, this.total)) {
      this.isEndOfData = true; 
      this.scrollView.showEndResults(); 
      this.resultsInfoView.showAllresults(this.total); 
    }  
    
    
    } catch (error) {
      console.error('Erro ao atualizar conteúdo:', error); 
    } finally { 
      this.loadingUI.enableUI();
      this.scroll.unlock(); 
      this.scrollView.hideLoading(); 
    }
  }

  public inicializar() {
    this.enableEvents(); 
    this.scroll.start();
    this.enableEventsDeCliqueNosCards(); 
    this.setInitialFilter(this.currentType);
    this.updateContent(this.currentType, ''); 
    this.resetSearch();
  }
}
