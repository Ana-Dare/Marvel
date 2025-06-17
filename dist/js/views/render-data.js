export class Renderer {
    constructor(container, tipoAtual) {
        this.container = container;
        this.tipoAtual = tipoAtual;
    }
    render(item) {
        const div = document.createElement('div');
        div.classList.add('item-container');
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
        div.appendChild(titulo);
        div.appendChild(img);
        this.container.appendChild(div);
    }
    limpar() {
        this.container.innerHTML = '';
    }
    mudarTipo(novoTipo) {
        this.tipoAtual = novoTipo;
    }
}
