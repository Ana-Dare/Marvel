import { ControllerApi } from "./controllers/HomeController.js";
const container = document.querySelector("#exibir");
const controller = new ControllerApi(container, "characters");
controller.inicializar();
