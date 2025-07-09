import { hash, ts, publicKey } from "./gerarHash.js";
import { ContentType } from "../interfaces/requestInterface.js";

export const urlBase = "https://gateway.marvel.com/v1/public/";

export function createUrl(
  tipo: ContentType,
  termo: string,
  offset: number,
  limit: number,
  orderBy: string,
): string {
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
