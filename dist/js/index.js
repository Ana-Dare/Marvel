import { ControllerApi } from './controllers/homeController.js';
const content = document.querySelector('#exibir');
const controller = new ControllerApi(content, 'characters');
controller.inicializar();
