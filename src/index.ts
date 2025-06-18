import { ControllerApi } from './controllers/controller-api.js';
import { Renderer } from './views/render-data.js';
import { MarvelApiService } from './services/api-service.js';
import { ContenType } from './interfaces/request-interface.js';
const content = document.querySelector('#exibir') as HTMLElement;
const controller = new ControllerApi(content, 'characters');
controller.inicializar();

/*
const marvelApi = new MarvelApiService();
const renderer = new Renderer(content, 'characters');

async function loadAndRenderContent(tipo: ContenType, termo: string, offset: number, limit: number, orderBy = '') {
  try {
    const { items, total } = await marvelApi.fetchContent(tipo, termo, offset, limit, orderBy);
    if (offset === 0) {
      renderer.limpar();
    }
   
    items.forEach((item) => renderer.render(item));
    console.log(`Total de itens encontrados: ${total}`);

  } catch (error) {
    console.error("Falha ao carregar o conteúdo. Por favor, tente novamente.");
  }
}
  */
