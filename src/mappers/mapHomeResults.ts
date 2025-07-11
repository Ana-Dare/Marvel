import { DataApi } from "../interfaces/requestInterface.js";
import { CurrentTypeInterface } from "../interfaces/requestInterface.js";

export function mapApiResults(
  results: DataApi[],
  tipo: CurrentTypeInterface
): DataApi[] {
  return results.map((item: DataApi) => ({
    currentType: tipo,
    name: item.name,
    title: item.title,
    id: item.id,
    thumbnail: {
      path: item.thumbnail?.path || null,
      extension: item.thumbnail?.extension || null,
    },
  }));
}
