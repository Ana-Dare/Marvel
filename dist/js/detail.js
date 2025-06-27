import { CharactersController } from "./controllers/DetailsController.js";
const container = document.getElementById("container-detail");
const controller = new CharactersController(container);
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
if (id) {
    controller.initialize(id);
}
else {
    container.innerHTML = "<p>ID do personagem não fornecido.</p>";
}
