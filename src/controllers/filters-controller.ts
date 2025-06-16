import { Renderer } from "../views/render-data.js";
import { ContenType} from "../interfaces/request-interface.js";
import { consumeAPI } from "../services/request-services.js";
import { DataApi } from "../interfaces/request-interface.js";

export class FiltersController {

    private offset: number = 0;
    private carregando: boolean = false;
    private fimDosDados: boolean = false;
    private resultadosPorPagina: number = 10;

    private renderer: Renderer;
    private termoAtual: string = '';

  constructor(container: HTMLElement, private tipoAtual: ContenType) {

    this.renderer = new Renderer(container, tipoAtual);
  }

  inicializar() {
    this.adicionarEventos();
    this.atualizarConteudo(this.tipoAtual, ''); 

     window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      this.atualizarConteudo(this.tipoAtual, this.termoAtual);
    }
  });
  }

  private adicionarEventos() {
    const filtros = document.querySelectorAll('.filtro');
    filtros.forEach(botao => {
      botao.addEventListener('click', e => {
        const target = e.currentTarget as HTMLElement; // retorna o elemento clicado
        filtros.forEach(btn => btn.classList.remove('ativo'));
        target.classList.add('ativo');
        const tipo = target.dataset.tipo as ContenType | undefined; //acessa o data-set e pega o valor do btn clicado
        if (tipo) {
          this.tipoAtual = tipo;
          this.renderer.mudarTipo(tipo);
        }
      });
    });

    const btnBuscar = document.querySelector('#buscar');
    const inputBusca = document.querySelector('#search') as HTMLInputElement | null;

    btnBuscar?.addEventListener('click', () => {
      if (inputBusca) {
        this.termoAtual = inputBusca.value.trim();
        this.atualizarConteudo(this.tipoAtual, this.termoAtual);
      }
    });
  }

  public async atualizarConteudo(tipo: ContenType, termo: string, limpar: boolean = false) {
    if (this.carregando || this.fimDosDados) return;

    this.carregando = true;

  if (limpar) {
    this.renderer.limpar();
    this.offset = 0;
    this.fimDosDados = false;
  }

  try {
    await consumeAPI(tipo, termo, 0, 10, '', this.renderer);
    const total = await consumeAPI(tipo, termo, this.offset, this.resultadosPorPagina, '', this.renderer);
    this.offset += this.resultadosPorPagina;

    if (this.offset >= total) {
      this.fimDosDados = true;
    }
  } catch (error) {
    console.error('Erro ao atualizar conteúdo:', error);
  } finally {
    this.carregando = false;
  }
}
}
