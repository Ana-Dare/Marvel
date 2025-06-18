import { cacheService } from "./cache-service.js";
import { DataApi } from "../interfaces/request-interface.js";
import { createUrl } from "../utils/createurl-utils.js";
import { ContenType } from "../interfaces/request-interface.js";

export interface MarvelApiResponse {
  items: DataApi[];
  total: number;
}

export class MarvelApiService {
  private _transformResults(results: any[], tipo: ContenType): DataApi[] {
    return results.map((item: any) => ({
      currentType: tipo,
      name: item.name || item.title, 
      title: item.title,
      description: item.description,
      thumbnail: {
        path: item.thumbnail?.path || null,
        extension: item.thumbnail?.extension || null
      }
    }));
  }

  private _generateCacheKey(tipo: ContenType, termo: string, offset: number, limit: number, orderBy: string): string {
    return `${tipo}:${termo}:offset=${offset}:limit=${limit}:order=${orderBy}`;
  }
  public async fetchContent(tipo: ContenType, termo: string, offset: number, limit: number, orderBy = ''): Promise<MarvelApiResponse> {
    const cacheKey = this._generateCacheKey(tipo, termo, offset, limit, orderBy);

    if (cacheService.has(cacheKey)) {
      return Promise.resolve(cacheService.get(cacheKey));
    }

    const url = createUrl(tipo, termo, offset, limit, orderBy);
    console.log(`[MarvelApiService] Cache MISS. Fetching from network: ${url}`);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Erro na requisição');
      }
      const dados = await res.json();
      const items = this._transformResults(dados.data.results, tipo);
      const total = dados.data.total;

      const response: MarvelApiResponse = { items, total };
      cacheService.set(cacheKey, response);

      return response;

    } catch (error) {
      console.error("Erro ao buscar e processar dados da API:", error);
      throw error;
    }
  }
}