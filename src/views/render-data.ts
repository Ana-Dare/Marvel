import { DataApi } from "../interfaces/request-interface.js";
import { ContenType } from "../interfaces/request-interface.js";

export class Renderer {
    constructor(private container: HTMLElement, private tipoAtual: ContenType) {}

    render(item: DataApi) {
        const div = document.createElement('div');
        div.style.marginBottom = '15px';

        const titulo = document.createElement('h3');
        titulo.textContent = item.currentType === 'characters'
            ? item.name || 'Nome indisponível.'
            : item.title || 'Título indisponível.';

        const descricao = document.createElement('p');
        descricao.textContent = item.description || 'Descrição indisponível.';

        const img = document.createElement('img');
        if (item.thumbnail.path && item.thumbnail.extension) {
            img.src = `${item.thumbnail.path}.${item.thumbnail.extension}`;
        } 
        img.alt = titulo.textContent || 'Imagem';
        img.width = 150;

        div.appendChild(titulo);
        div.appendChild(descricao);
        div.appendChild(img);

        this.container.appendChild(div);
    }
        limpar() {
            this.container.innerHTML = '';
        }

        mudarTipo(novoTipo: ContenType) {
            this.tipoAtual = novoTipo;
        }
}   
