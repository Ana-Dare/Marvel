import { DataApi } from "../../interfaces/requestInterface.js";
import { ContentType } from "../../interfaces/requestInterface.js";

export class Renderer {
    constructor(protected container: HTMLElement, protected tipoAtual: ContentType) {}

    public render(item: DataApi) {
        const cards = document.createElement('div');
        cards.classList.add('item-container');
        cards.dataset.id = item.id.toString();
        cards.dataset.type = item.currentType;
            console.log("Tipo recebido no card:", item.currentType);
        const titulo = document.createElement('h3');
        titulo.classList.add('titulo-item-container');
        titulo.textContent = item.currentType === 'characters'
            ? item.name || 'Nome indisponível.'
            : item.title || 'Título indisponível.';

        const img = document.createElement('img');
        img.classList.add('img-item-container');
        if (item.thumbnail.path && item.thumbnail.extension) {
            img.src = `${item.thumbnail.path}.${item.thumbnail.extension}`;
        } 
        img.alt = titulo.textContent || 'Imagem';
        img.width = 100;

        cards.appendChild(titulo);
        cards.appendChild(img);
        this.container.appendChild(cards);
    }
    public limpar() {
            this.container.innerHTML = '';
        }
    public mudarTipo(novoTipo: ContentType) {
            this.tipoAtual = novoTipo;
        }
}   
