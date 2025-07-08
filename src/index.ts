import { ControllerApi } from "./controllers/HomeController.js";
const content = document.querySelector("#exibir") as HTMLElement;

const controller = new ControllerApi(content, "characters");
controller.inicializar();
