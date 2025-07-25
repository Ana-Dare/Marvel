import { hash, ts, publicKey } from "./gerarHash.js";
export const urlBase = "https://gateway.marvel.com/v1/public/";
export function createUrl(type, term, offset, limit, orderBy) {
    let url = `${urlBase}/${type}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
    if (orderBy) {
        url += `&orderBy=${orderBy}`;
    }
    if (term) {
        url +=
            type === "characters"
                ? `&nameStartsWith=${encodeURIComponent(term)}`
                : `&titleStartsWith=${encodeURIComponent(term)}`;
    }
    return url;
}
