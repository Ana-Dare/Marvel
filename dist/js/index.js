import { ControllerApi } from './controllers/controller-api.js';
const content = document.querySelector('#exibir');
const controller = new ControllerApi(content, 'characters');
controller.inicializar();
