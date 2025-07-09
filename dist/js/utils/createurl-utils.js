import { hash, ts, publicKey } from "./gerarHash.js";
export const urlBase = "https://gateway.marvel.com/v1/public/";
export function createUrl(tipo, termo, offset, limit, orderBy) {
    let url = `${urlBase}/${tipo}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
    if (orderBy) {
        url += `&orderBy=${orderBy}`;
    }
    if (termo) {
        url +=
            tipo === "characters"
                ? `&nameStartsWith=${encodeURIComponent(termo)}`
                : `&titleStartsWith=${encodeURIComponent(termo)}`;
    }
    return url;
}
