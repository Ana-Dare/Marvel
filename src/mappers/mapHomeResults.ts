import { DataApi } from "../interfaces/request-interface.js";
import { ContenType } from "../interfaces/request-interface.js";

export function mapApiResults(results: DataApi[], tipo: ContenType): DataApi[] {
  return results.map((item: DataApi) => ({
    currentType: tipo,
    name: item.name,
    title: item.title,
    description: item.description,
    id: item.id,
    thumbnail: {
      path: item.thumbnail?.path || null,
      extension: item.thumbnail?.extension || null
    }
  }));
}