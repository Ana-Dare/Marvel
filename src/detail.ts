import { CharactersController } from "./controllers/DetailsController.js";

const container = document.getElementById("container-detail") as HTMLElement;
const controller = new CharactersController(container);

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  controller.initialize(id);  // <-- Chamada do initialize aqui!
} else {
  container.innerHTML = "<p>ID do personagem não fornecido.</p>";
}
