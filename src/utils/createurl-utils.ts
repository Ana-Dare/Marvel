import { apiKey, ts, hash } from "../constants/globais.js";
import { ContenType } from "../interfaces/request-interface.js";

export function createUrl(tipo: ContenType, termo: string, offset: number, limit: number, orderBy: string): string {
  let url = `https://gateway.marvel.com/v1/public/${tipo}?ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

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
