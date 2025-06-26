import { Renderer } from "../views/RenderData.js"; 
import { ContenType} from "../interfaces/request-interface.js";
import { obterOrderBy } from "../utils/orderby-utils.js";
import { ScrollDetector } from "./ScrollDetector .js";
import { ScrollView } from "../views/scrollView.js";
import { LoadingUI } from "../views/loadingUI.js";
import { mapApiResults } from "../mappers/mapHomeResults.js";
import { fetchFromAPI } from "../services/requestApi.js";
import { DataApi } from "../interfaces/request-interface.js";
import { ResultsInfoView } from "../views/resultsInfo.js";
import { cacheService } from "../models/cache.js";
import { createUrl } from "../utils/createurl-utils.js";
import { ContentDataFetcher } from "../services/contentDataFetcher.js";
import { PaginationController } from "../services/pagination.js";
import { ContentDisplay } from "../views/contentDisplay.js";

const btnFiltros = Array.from(document.querySelectorAll('.filtro')) as HTMLElement[];
const btnBuscar = document.querySelector('#buscar') as HTMLButtonElement;
const inputBusca = document.querySelector('#search') as HTMLInputElement;
const selectOrdenacao = document.querySelector('#ordenacao') as HTMLSelectElement;

export class ControllerApi {
    private offset: number = 0; 
    private total: number = 0; 
    private fimDosDados: boolean = false; 
    private limit: number = 10; 
    private renderer: Renderer; 
    private termoAtual: string = ''; 
    private ordemAtual: string = ''; 
    private scroll: ScrollDetector; 
    private scrollView: ScrollView; 
    private loadingUI: LoadingUI;
    private resultsInfoView: ResultsInfoView;
    private dataFetcher: ContentDataFetcher;
    private paginationController: PaginationController;
    private displayContent: ContentDisplay;

  constructor(
    public container: HTMLElement, 
    private tipoAtual: ContenType
  ) 
  {
    this.renderer = new Renderer(container, tipoAtual);
    this.scrollView = new ScrollView(); 
    this.loadingUI = new LoadingUI();
    this.resultsInfoView = new ResultsInfoView(); 
     this.dataFetcher = new ContentDataFetcher(this.obterDados.bind(this));
    this.paginationController = new PaginationController(this.limit);
    this.displayContent = new ContentDisplay(this.renderer);
    this.scroll = new ScrollDetector(async () => { 
      if (this.fimDosDados) return; 

      this.scroll.lock(); 
      this.scrollView.showLoading(); 

      await this.atualizarConteudo(this.tipoAtual, this.termoAtual); 

      this.scroll.unlock(); 
      this.scrollView.hideLoading();
    });
  }

  private adicionarEventos() { 
    btnFiltros.forEach(btn => {
      btn.addEventListener('click', async e => {
        const target = e.currentTarget as HTMLElement; 
          btnFiltros.forEach(btn => btn.classList.remove('ativo'));
          target.classList.add('ativo');

        const tipo = target.dataset.tipo as ContenType | undefined; 
          if (tipo) {
            const termoDigitado = inputBusca.value.trim();
            this.termoAtual = termoDigitado;
            this.tipoAtual = tipo; 
            this.renderer.mudarTipo(tipo); 
            const valorOrdenacao = selectOrdenacao?.value || ''; 
            this.ordemAtual = obterOrderBy(this.tipoAtual, valorOrdenacao);
            await this.atualizarConteudo(this.tipoAtual, this.termoAtual, true); 
          }
      });
    });

    btnBuscar.addEventListener('click', async () => { 
      if (inputBusca) {
        const termoDigitado = inputBusca.value.trim(); 
      if (!termoDigitado) {
        alert('Digite algo!') 
        return;
    }
      this.termoAtual = termoDigitado; 
     
      const valorOrdenacao = selectOrdenacao?.value || '';
      this.ordemAtual = obterOrderBy(this.tipoAtual, valorOrdenacao); 

      this.scroll.lock(); 
      this.scrollView.showLoading(); 

      await this.atualizarConteudo(this.tipoAtual, this.termoAtual, true); 
      }
    });
  }

private marcarFiltroInicial(tipo: ContenType) {
  btnFiltros.forEach(btn => {
    btn.classList.remove('ativo');
    if (btn.dataset.tipo === tipo) {
      btn.classList.add('ativo');
    }
  });
}

private DeletarBusca() {
  const BtnDeletarBusca = document.querySelector('#deletar') as HTMLButtonElement;
  BtnDeletarBusca.addEventListener('click' ,async () => {
    inputBusca.value = '';
    this.termoAtual = '';
    this.offset = 0;
    this.fimDosDados = false;

    this.tipoAtual = "characters";
    this.renderer.mudarTipo("characters");
    this.offset = 0;
    this.limit =  10;
    this.total = 0;
    this.ordemAtual = '';

    this.marcarFiltroInicial("characters");

    await this.atualizarConteudo("characters", '', true);
  })
}

private adicionarEventosDeCliqueNosCards() { 
  if (!this.container) return; 
  this.container.addEventListener('click', (e) => { 
    const card = (e.target as HTMLElement).closest('.item-container'); 
    if (card && card instanceof HTMLElement) {  
      const id = card.dataset.id; 
      if (id) {
        window.location.href = `detail.html?id=${id}`; 
      }
    }
  });
}

public async obterDados(tipo: ContenType, termo: string): Promise<{ itens: DataApi[]; total: number }> { 
  const url = createUrl(tipo, termo, this.offset, this.limit, this.ordemAtual); 
  console.log(url);

  const cache = cacheService.get(url); 
  if (cache) return cache; 

  const { dados } = await fetchFromAPI(tipo, termo, this.offset, this.limit, this.ordemAtual); 
  const total = dados.data.total; 
  const results:DataApi[] = dados.data.results;
  const itens = mapApiResults(results, tipo); 

  cacheService.set(url, { itens, total }); 
  return { itens, total }; 
}

  public async atualizarConteudo(tipo: ContenType, termo: string, limpar: boolean = false) {
    this.loadingUI.disableUI(); 
    this.scrollView.HideEndResults();

      if (limpar) { 
        this.offset = 0
        this.fimDosDados = false; 
      }
      if (this.fimDosDados) { 
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
      this.fimDosDados = true; 
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
    this.adicionarEventos(); 
    this.scroll.start();
    this.adicionarEventosDeCliqueNosCards(); 
    this.marcarFiltroInicial(this.tipoAtual);
    this.atualizarConteudo(this.tipoAtual, ''); 
    this.DeletarBusca();
  }
}
