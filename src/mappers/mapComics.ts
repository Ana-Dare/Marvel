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
    pageCount: item.pageCount || "Número de páginas indisponível",
    prices: {
      price: item.prices.price ?? 'Valor indisponível',
      type: item.prices.type || "Tipo de preço indisponível",
    },
    characters: {
      available: item.characters.available || 0,
      collectionURI: item.characters.collectionURI || '',
      items: item.characters.items || []
    },
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
