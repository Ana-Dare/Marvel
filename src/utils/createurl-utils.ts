import { apiKey, ts, hash, baseUrl } from "../constants/globais.js";
import { ContentType } from "../interfaces/requestInterface.js";

export function createUrl(tipo: ContentType, termo: string, offset: number, limit: number, orderBy: string): string {
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