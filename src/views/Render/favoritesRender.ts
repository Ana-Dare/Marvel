import { isItemFavorite } from "../../utils/localStorage.js";

export class RenderitemFavorites {
    constructor(
        public container: HTMLElement,
    ){}

    public renderitemFavorites(){
        this.container.innerHTML = '';
        const itemFavoriteString = localStorage.getItem('favorite') || '{}';
        let itemFavorite: Record<string, Record<string, { name: string; title: string; imagem: string }>> = {};
        try {
            itemFavorite = JSON.parse(itemFavoriteString);
        } catch (error) {
            console.error('Erro ao converter favoritos:', error);
        }

        if(Object.keys(itemFavorite).length === 0) {
            alert('Nenhum item salvo');
            return;
        }

        for (const type in itemFavorite) {
            const items = itemFavorite[type];

            for (const id in items) {
                const item = items[id];

                const card = document.createElement('div');
                card.classList.add('item-container');
                card.dataset.id = id;
                card.dataset.type = type;

                const title = document.createElement('h3');
                title.classList.add('titulo-item-container');
                title.textContent = type === 'characters'
                ? item.name || 'Nome indisponível'
                : item.title || 'Título indisponível';

                const img = document.createElement('img');
                img.classList.add('img-item-container');
                img.src = item.imagem || '';
                img.alt = title.textContent || 'Imagem';
                img.width = 100;

                const btnCardFavorite = document.createElement("button");
                btnCardFavorite.classList.add("favorite");
                if(isItemFavorite('favorite', card.dataset.type, card.dataset.id)) {
                    btnCardFavorite.classList.add('active')
                } else {
                    btnCardFavorite.classList.remove('active');
                }
                card.appendChild(btnCardFavorite);
                card.appendChild(title);
                card.appendChild(img);

                this.container.appendChild(card);
            }
        }
    }
}


            

        

