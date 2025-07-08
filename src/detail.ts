import { DetailController } from "./controllers/DetailsController.js";
import { RenderCharacters } from "./views/Render/charactersRender.js";
import { RenderComics } from "./views/Render/comicsRender.js";
import { RenderSeries } from "./views/Render/seriesRender.js";

const container = document.getElementById("detail")!;

const controller = new DetailController(
  new RenderCharacters(container),
  new RenderComics(container),
  new RenderSeries(container),
  container,
);

controller.initialize();
