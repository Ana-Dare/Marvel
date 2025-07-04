export class Renderer {
    constructor(container, tipoAtual) {
        this.container = container;
        this.tipoAtual = tipoAtual;
    }
    render(item) {
        var _a, _b;
        const cards = document.createElement('div');
        cards.classList.add('item-container');
        cards.dataset.id = item.id.toString();
        cards.dataset.type = item.currentType;
        cards.dataset.name = item.name || '';
        cards.dataset.title = item.title || '';
        cards.dataset.thumbnailPath = ((_a = item.thumbnail) === null || _a === void 0 ? void 0 : _a.path) || '';
        cards.dataset.thumbnailExtension = ((_b = item.thumbnail) === null || _b === void 0 ? void 0 : _b.extension) || '';
        const titulo = document.createElement('h3');
        titulo.classList.add('titulo-item-container');
        titulo.textContent = item.currentType === 'characters'
            ? item.name || 'Nome indisponível.'
            : item.title || 'Título indisponível.';
        const favorite = document.createElement('button');
        favorite.classList.add('favorite');
        const img = document.createElement('img');
        img.classList.add('img-item-container');
        if (item.thumbnail.path && item.thumbnail.extension) {
            img.src = `${item.thumbnail.path}.${item.thumbnail.extension}`;
        }
        img.alt = titulo.textContent || 'Imagem';
        img.width = 100;
        cards.appendChild(favorite);
        cards.appendChild(titulo);
        cards.appendChild(img);
        this.container.appendChild(cards);
        console.log(item);
    }
    getFavoriteItem(id) {
        let dataLocalStorage = [];
        try {
            dataLocalStorage = JSON.parse(localStorage.getItem('characters') || '');
        }
        catch (error) {
            return false;
        }
        const characters = dataLocalStorage;
        return characters.includes(id);
    }
    limpar() {
        this.container.innerHTML = '';
    }
    mudarTipo(novoTipo) {
        this.tipoAtual = novoTipo;
    }
}
