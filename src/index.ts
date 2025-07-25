import { ControllerApi } from "./controllers/HomeController.js";
const container = document.querySelector("#container-index") as HTMLElement;

const controller = new ControllerApi(container, "characters");
controller.inicializar();
