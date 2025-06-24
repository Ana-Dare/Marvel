import { Renderer } from "../views/renderData.js"; 
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
//import { obterDados } from "../interfaces/obterDados.js"

const btnFiltros = Array.from(document.querySelectorAll('.filtro')) as HTMLElement[];
const btnBuscar = document.querySelector('#buscar') as HTMLButtonElement;
const inputBusca = document.querySelector('#search') as HTMLInputElement;

export class ControllerApi {
    private offset: number = 0; // controla onde inicia os resultados
    private total: number = 0; // controla o total de resultados
    private fimDosDados: boolean = false; //controla se os dados chegaram ao fim
    private limit: number = 10; // controla os resultados por página
    private renderer: Renderer; // controla a renderização
    private termoAtual: string = ''; // controla o termo atual digitado
    private ordemAtual: string = ''; // controla a ordem atual selecionada
    private scroll: ScrollDetector; // controla o scroll
    private scrollView: ScrollView; // controla as mensagens do scroll
    private loadingUI: LoadingUI; // controla a desabilitação dos botões
    private resultsInfoView: ResultsInfoView; //controla as informações sobre a quantidade
    private dataFetcher: ContentDataFetcher;
    private paginationController: PaginationController;
    private displayContent: ContentDisplay;

  constructor(
    public container: HTMLElement, // cria um container
    private tipoAtual: ContenType // cria um termo atual
  ) 
  { // define o que vai ser ativado assim que a classe for instanciada
    this.renderer = new Renderer(container, tipoAtual); // instancia o renderer
    this.scrollView = new ScrollView(); //instancia o scroll view
    this.loadingUI = new LoadingUI(); // instancia o controle de btn
    this.resultsInfoView = new ResultsInfoView(); // instancia informações do resultado
     this.dataFetcher = new ContentDataFetcher(this.obterDados.bind(this));
    this.paginationController = new PaginationController(this.limit);
    this.displayContent = new ContentDisplay(this.renderer);
    this.scroll = new ScrollDetector(async () => { //instancia scroll com uma função aync no constructor
      if (this.fimDosDados) return; // quando chegar ao final dos dados

      this.scroll.lock(); //ativa o scroll
      this.scrollView.showLoading(); //exibe carregando

      await this.atualizarConteudo(this.tipoAtual, this.termoAtual); //espera carregar e atualiza o conteudo

      this.scroll.unlock(); //bloqueia o scroll  
      this.scrollView.hideLoading();// esconde carregando
    });
  }

  private adicionarEventos() { // adiciona clique aos botões ***
    btnFiltros.forEach(btn => {
      btn.addEventListener('click', e => {
        const target = e.currentTarget as HTMLElement; // retorna o elemento clicado
          btnFiltros.forEach(btn => btn.classList.remove('ativo'));
          target.classList.add('ativo');
        const tipo = target.dataset.tipo as ContenType | undefined; //acessa o data-set e pega o valor do btn clicado
          if (tipo) {
            this.tipoAtual = tipo; // atualiza tipo com o valor do btn clicado
            this.renderer.mudarTipo(tipo); // passa para o render o novo tipo
          }
      });
    });
    btnBuscar.addEventListener('click', async () => { // adiciona clique e funcionalidade ao btn de busca
      if (inputBusca) {
        const termoDigitado = inputBusca.value.trim(); // termo digitado igual ao que esta no input
      if (!termoDigitado) {
        alert('Digite algo!') // caso não tenha nada escrito, não continua
        return;
    }
      this.termoAtual = termoDigitado; // passa o valor do input para termo atual
      const selectOrdenacao = document.querySelector<HTMLSelectElement>('#ordenacao'); //seleciona a ordenação
      const valorOrdenacao = selectOrdenacao?.value || ''; // pega o valor da ordenação
      this.ordemAtual = obterOrderBy(this.tipoAtual, valorOrdenacao); // passa para ordem atual o valor de orderBy

      this.scroll.lock(); //desbloqueia o scroll
      this.scrollView.showLoading(); //exibe carregando

      await this.atualizarConteudo(this.tipoAtual, this.termoAtual, true); // limpa e atualiza o conteudo com os parametros
      }
    });
  }

private adicionarEventosDeCliqueNosCards() { // adiciona clique aos cards
  if (!this.container) return; // se não existir container não executa a função
  this.container.addEventListener('click', (e) => { // adiciona clique ao container
    const card = (e.target as HTMLElement).closest('.item-container'); // procura o elemento mais próximo com a classe item.conteiner
    if (card && card instanceof HTMLElement) {  //verifica se card é realmente um elemento do DOM
      const id = card.dataset.id; // define que id é o dataset.id do card
      if (id) {
        window.location.href = `detail.html?id=${id}`; //redireciona para uma página html referente ao id do card
      }
    }
  });
}

public async obterDados(tipo: ContenType, termo: string): Promise<{ itens: DataApi[]; total: number }> { //obtem os dados, cria a url e retrona os itens e total
  const url = createUrl(tipo, termo, this.offset, this.limit, this.ordemAtual); // cria  aurl com os parametros necessários
  const cache = cacheService.get(url); // guarda a url no cache

  if (cache) return cache; // se tiver cache retorna cache

  const { dados } = await fetchFromAPI(tipo, termo, this.offset, this.limit, this.ordemAtual); // pega os dados vindos da fetch
  const total = dados.data.total; //pega o total dentro dos dados
  const results:DataApi[] = dados.data.results; // pega os resultados dentro de dados com a interface dataapi
  const itens = mapApiResults(results, tipo); // cria um map com os resultados e tipo atual

  cacheService.set(url, { itens, total }); // armazena os resultados em cache
  return { itens, total }; // retorna os dados salvos em cache
}

  public async atualizarConteudo(tipo: ContenType, termo: string, limpar: boolean = false) {
    console.log("testando se funcionou") // função para atualizar conteudo
    this.loadingUI.disableUI(); //desabilita os btn qnd inicia a busca
    this.scrollView.HideEndResults(); // esconde os resultados dos itens

      if (limpar) { // quando limpar for true
        this.offset = 0//limpa se for primeira pagina
        this.fimDosDados = false; 
        // define que os dados não chegaram ao fim
      }
      if (this.fimDosDados) { // quando fim dso dados for true
        this.resultsInfoView.showAllLoaded(this.total) // exibe mensagem de fim
        this.loadingUI.enableUI(); // desbloqueia os btn
        return; // retorna
      }
    try {
    const { itens, total }= await this.dataFetcher.fetchContent(tipo, termo); // espera a resposta de obterdados

    this.displayContent.clearIfFirstPage(this.offset);// limpa se for a primeira pagina
    this.displayContent.renderItems(itens); //renderizar os itens pesquisados

    this.total = total; //define o total retornado para o propriedade total
    this.offset = this.paginationController.calculateNextOffset(this.offset); //soma o inicial ao resultado por página
    this.resultsInfoView.updateProgress(this.offset, this.total); // exibe mensagem de progressp

    if(this.paginationController.hasReachedEnd(this.offset, this.total)) {
      this.fimDosDados = true; //fim dos dados
      this.scrollView.showEndResults(); //mensagem de fim
      this.resultsInfoView.showAllresults(this.total); // total de resultados
    }  
    
    
    } catch (error) {
      console.error('Erro ao atualizar conteúdo:', error); // erro
    } finally { // em qualquer situação
      this.loadingUI.enableUI(); //desbloqueia os botões
      this.scroll.unlock(); // desbloqueia o scroll
      this.scrollView.hideLoading(); // esconde carregando
    }
  }

  public inicializar() {
    this.adicionarEventos(); //adiciona os clique ao header
    this.scroll.start(); //ativa o scroll
    this.adicionarEventosDeCliqueNosCards(); //adiciona clique aos cards
    this.atualizarConteudo(this.tipoAtual, ''); //atualiza o conteudo com tipo atual e termo padrão.
  }
}
