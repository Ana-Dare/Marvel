import { apiKey, ts, hash, baseUrl } from "../constants/globais.js";
export function createUrl(tipo, termo, offset, limit, orderBy) {
    let url = `${baseUrl}/${tipo}?ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
    if (orderBy) {
        url += `&orderBy=${orderBy}`;
    }
    if (termo) {
        url += tipo === 'characters'
            ? `&nameStartsWith=${encodeURIComponent(termo)}`
            : `&titleStartsWith=${encodeURIComponent(termo)}`;
    }
    return url;
}
