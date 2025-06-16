import { FiltersController } from './controllers/filters-controller.js';
const content = document.querySelector('#exibir');
const controller = new FiltersController(content, 'characters');
controller.inicializar();
