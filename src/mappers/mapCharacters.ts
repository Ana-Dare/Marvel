import { Characters } from "../interfaces/requestInterface.js";

export function mapCharacters(results: Characters[]):Characters[] {
    return results.map((item: Characters) => ({
        currentType: "characters",
        name: item.name || null,
        title: item.title || null,
        id: String(item.id),
        thumbnail: {
            path: item.thumbnail?.path,
            extension: item.thumbnail?.extension 
        },
        description: item.description || "",
        comics: {
            available: item.comics?.available || 0,
            collectionURI: item.comics?.collectionURI || "",
            items: item.comics?.items || []
        },
        series: {
            available: item.series?.available || 0,
            collectionURI: item.series?.collectionURI || "",
            items: item.series?.items || []
        }
    }));
}
  
