import { Series } from "../interfaces/requestInterface.js";

export function mapSeries(results: Series[]):Series[] {
    return results.map((item: Series) => ({
        currentType: "series",
        name: item.name || null,
        title: item.title || null,
        id: String(item.id),
        thumbnail: {
            path: item.thumbnail?.path,
            extension: item.thumbnail?.extension 
        },
        
        description: item.description || "",
        pageCount: item.pageCount || "",
        startYear: item.startYear || "",
        endYear: item.endYear || "",

        creators: {
            available: item.creators?.available || 0,
            collectionURI: item.creators?.collectionURI || "",
            items: item.creators?.items || []
        },
        characters: {
            available: item.comics?.available || 0,
            collectionURI: item.comics?.collectionURI || "",
            items: item.comics?.items || []
        },
        comics: {
            available: item.comics?.available || 0,
            collectionURI: item.comics?.collectionURI || "",
            items: item.comics?.items || []
        }
    }));
}
  