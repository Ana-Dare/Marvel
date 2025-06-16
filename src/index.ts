import { consumeAPI } from "./services/request-services.js";
import { Renderer } from "./views/render-data.js";

const contentEl = document.querySelector('#exibir') as HTMLElement;
const renderer = new Renderer(contentEl, 'characters');

consumeAPI('characters', 'hulk', 0, 10, '', renderer);
