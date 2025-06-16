import { crateUrl } from "../utils/createurl-utils.js";
import { ContenType } from "../interfaces/request-interface.js";
import { DataApi } from "../interfaces/request-interface.js";
import { Renderer } from "../views/render-data.js";

export async function consumeAPI(tipo: ContenType, termo: string, offset: number, limit: number, orderBy = '', render: Renderer): Promise<void> {
    let url = crateUrl (tipo, termo, offset, 10, orderBy);
  try {
    const res = await fetch(url);
    const dados = await res.json();
    const result = dados.data.results;
    console.log(url);
    console.log(result);
    
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

    if (offset === 0) render.limpar();
   
    itens.forEach((item) => render.render(item));

  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}



