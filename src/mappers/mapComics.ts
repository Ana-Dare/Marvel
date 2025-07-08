import { Comics } from "../interfaces/requestInterface.js";

export function mapComics(results: Comics[]): Comics[] {
  return results.map((item: Comics) => ({
    currentType: "comics",
    name: item.name || null,
    title: item.title || null,
    id: String(item.id),
    thumbnail: {
      path: item.thumbnail?.path,
      extension: item.thumbnail?.extension,
    },
    description: item.description || "",
    pageCount: item.pageCount || "Número de páginas não disponível",
    prices: {
      price: item.prices.price ?? 0,
      type: item.prices.type || "Tipo de preço não disponível",
    },
    characters: item.characters || "Personagens do quadrinho não disponíveis",
    series: {
      available: item.series?.available || 0,
      collectionURI: item.series?.collectionURI || "",
      items: item.series?.items || [],
    },
    creators: {
      available: item.creators?.available || 0,
      collectionURI: item.creators?.collectionURI || "",
      items: item.creators?.items || [],
    },
  }));
}
