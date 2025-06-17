import { ControllerApi } from './controllers/controller-api.js';

const content = document.querySelector('#exibir') as HTMLElement;
const controller = new ControllerApi(content, 'characters');
controller.inicializar();
