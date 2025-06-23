import { Renderer } from "../views/RenderData.js"; 
import { ContenType} from "../interfaces/request-interface.js";
import { consumeAPI } from "../services/request-services.js";
import { obterOrderBy } from "../utils/orderby-utils.js";
import { ScrollDetector } from "./ScrollDetector .js";
import { ScrollView } from "../views/ScrollDetectorView.js";
import { LoadingUI } from "../views/LoadingUI.js";

const btnFiltros = Array.from(document.querySelectorAll('.filtro')) as HTMLElement[];
const btnBuscar = document.querySelector('#buscar') as HTMLButtonElement;
const inputBusca = document.querySelector('#search') as HTMLInputElement;

export class ControllerApi {
    private offset: number = 0;
    private total: number = 0;
    private fimDosDados: boolean = false;
    private resultadosPorPagina: number = 10;
    private renderer: Renderer;
    private termoAtual: string = '';
    private ordemAtual: string = '';
    private scroll: ScrollDetector;
    private scrollView: ScrollView;
    private loadingUI: LoadingUI;
    private resultsInfo: HTMLElement;

  constructor(
    public container: HTMLElement,
    private tipoAtual: ContenType
  ) 
  {
    this.renderer = new Renderer(container, tipoAtual);
    this.scrollView = new ScrollView();
    this.loadingUI = new LoadingUI();
    this.resultsInfo = document.querySelector('#resultsInfo') as HTMLElement;

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
      btn.addEventListener('click', e => {
        const target = e.currentTarget as HTMLElement; // retorna o elemento clicado
          btnFiltros.forEach(btn => btn.classList.remove('ativo'));
          target.classList.add('ativo');
        const tipo = target.dataset.tipo as ContenType | undefined; //acessa o data-set e pega o valor do btn clicado
          if (tipo) {
            this.tipoAtual = tipo;
            this.renderer.mudarTipo(tipo);
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
      const selectOrdenacao = document.querySelector<HTMLSelectElement>('#ordenacao');
      const valorOrdenacao = selectOrdenacao?.value || '';
      this.ordemAtual = obterOrderBy(this.tipoAtual, valorOrdenacao);

      this.scroll.lock();
      this.scrollView.showLoading();

        
      await this.atualizarConteudo(this.tipoAtual, this.termoAtual, true);
      }
    });
  }

private adicionarEventosDeCliqueNosCards() {
  if (!this.container) return;
  this.container.addEventListener('click', (e) => {
    const card = (e.target as HTMLElement).closest('.item-container');
    if (card && card instanceof HTMLElement) {
      const id = card.dataset.id;
      if (id) {
        console.log('Card clicado!', card);
        console.log('ID do card:', id);
        window.location.href = `detail.html?id=${id}`;
      }
    }
  });
}

  public async atualizarConteudo(tipo: ContenType, termo: string, limpar: boolean = false) {
    this.loadingUI.disableUI();
    this.scrollView.HideEndResults();
      if (limpar) {
        this.renderer.limpar();
        this.offset = 0;
        this.fimDosDados = false;
      }
      if (this.fimDosDados) {
        this.resultsInfo.textContent = `Showing all ${this.total} results.`;
        this.loadingUI.enableUI();
        return;
      }
    try {
      const total = await consumeAPI(tipo, termo, this.offset, this.resultadosPorPagina, this.ordemAtual, this.renderer);
      this.total = total;
      this.offset += this.resultadosPorPagina;
      this.resultsInfo.textContent = `Showing ${Math.min(this.offset, this.total)} of ${this.total} results.`;

      if (this.offset >= this.total) {
            this.fimDosDados = true;
            this.scrollView.showEndResults();
            this.resultsInfo.textContent = `All ${this.total} results loaded.`;
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
    this.atualizarConteudo(this.tipoAtual, '');
  }
}
