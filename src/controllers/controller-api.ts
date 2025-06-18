import { Renderer } from "../views/render-data.js";
import { ContenType} from "../interfaces/request-interface.js";
import { consumeAPI } from "../services/request-services.js";
import { InfiniteScroll } from "../utils/infinitescroll-utils.js";
import { obterOrderBy } from "../utils/orderby-utils.js";
import { DataApi } from "../interfaces/request-interface.js";

export class ControllerApi {
    private offset: number = 0;
    private total: number = 0;
    private carregando: boolean = false;
    private fimDosDados: boolean = false;
    private resultadosPorPagina: number = 10;
    private renderer: Renderer;
    private termoAtual: string = '';
    private ordemAtual: string = '';
    private scroll: InfiniteScroll;

  constructor(
    public container: HTMLElement,
    private tipoAtual: ContenType
  ) 
  {
  this.renderer = new Renderer(container, tipoAtual);
  }

  private adicionarEventos() {
    const btnFiltros = Array.from(document.querySelectorAll('.filtro')) as HTMLElement[];
    const btnBuscar = document.querySelector('#buscar') as HTMLButtonElement;
    const inputBusca = document.querySelector('#search') as HTMLInputElement;

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
    btnBuscar.addEventListener('click', () => {
      if (inputBusca) {
          this.termoAtual = inputBusca.value.trim();

          const selectOrdenacao = document.querySelector<HTMLSelectElement>('#ordenacao');
          const valorOrdenacao = selectOrdenacao?.value || '';
          this.ordemAtual = obterOrderBy(this.tipoAtual, valorOrdenacao);

          this.atualizarConteudo(this.tipoAtual, this.termoAtual, true);
      }
    });
  }
  public async atualizarConteudo(tipo: ContenType, termo: string, limpar: boolean = false) {
    if (this.carregando || this.fimDosDados) return;
  
      if (limpar) {
        this.renderer.limpar();
        this.offset = 0;
        this.fimDosDados = false;
        this.scroll.unlock();
      }
        this.carregando = true;
    try {
      const total = await consumeAPI(tipo, termo, this.offset, this.resultadosPorPagina, this.ordemAtual, this.renderer);
      this.total = total;
      this.offset += this.resultadosPorPagina;

      

      if (this.offset >= this.total) {
              this.fimDosDados = true;
      } else {
        this.scroll?.unlock();
      }
    } catch (error) {
      console.error('Erro ao atualizar conteúdo:', error);
    } finally {
      this.carregando = false;
    }
  }

  public inicializar() {
    this.adicionarEventos();
    this.scroll = new InfiniteScroll(() => {
      this.atualizarConteudo(this.tipoAtual, this.termoAtual);
    }, this.container);

    this.scroll.startEvent();
    this.atualizarConteudo(this.tipoAtual, '');
  }
}
