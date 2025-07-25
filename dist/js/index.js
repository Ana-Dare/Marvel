import { ControllerApi } from "./controllers/HomeController.js";
const container = document.querySelector("#container-index");
const controller = new ControllerApi(container, "characters");
controller.inicializar();
