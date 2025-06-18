import { createUrl } from "../utils/createurl-utils.js";
import { ContenType } from "../interfaces/request-interface.js";
import { DataApi } from "../interfaces/request-interface.js";
import { Renderer } from "../views/render-data.js";
import { cacheService } from "./cache-service.js";
import { CachedResponse } from "../interfaces/cache-interface.js";

export async function consumeAPI(tipo: ContenType, termo: string, offset: number, limit: number, orderBy = '', render: Renderer): Promise<number> {

    const url = createUrl (tipo, termo, offset, limit, orderBy);
  
    const cachedResponse: CachedResponse | undefined = cacheService.get(url);

    if (cachedResponse) {
        if (offset === 0) render.limpar();
        cachedResponse.itens.forEach((item) => render.render(item));
        return cachedResponse.total;
    }
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Erro na API: ${res.status} ${res.statusText}`);
        }

        const dados = await res.json();
        const total: number = dados.data.total;
        const result = dados.data.results;
    
        const itens: DataApi[] = result.map((item: any) => ({
            currentType: tipo,
            name: item.name,
            title: item.title,
            description: item.description,
            thumbnail: {
                path: item.thumbnail?.path || null,
                extension: item.thumbnail?.extension || null
            }
        }));

        cacheService.set(url, { itens, total });
        if (offset === 0) render.limpar();
        itens.forEach((item) => render.render(item));

        return total; 

    } catch (error) {
        console.error("Erro na requisição:", error);
        return 0;
    }
}



