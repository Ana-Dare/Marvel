import { ControllerApi } from './controllers/HomeController.js';
const content = document.querySelector('#exibir');
const controller = new ControllerApi(content, 'characters');
controller.inicializar();
