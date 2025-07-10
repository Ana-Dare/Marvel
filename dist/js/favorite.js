import { favoriteController } from "./controllers/FavoriteController.js";
import { RenderitemFavorites } from "./views/Render/favoritesRender.js";
const container = document.querySelector('#container-favorite');
const controller = new favoriteController(new RenderitemFavorites(container), container);
controller.initialize();
