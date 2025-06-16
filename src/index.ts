import { FiltersController } from './controllers/filters-controller.js';

const content = document.querySelector('#exibir') as HTMLElement;
const controller = new FiltersController(content, 'characters');
controller.inicializar();
