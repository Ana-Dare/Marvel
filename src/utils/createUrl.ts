import { hash, ts, publicKey } from "./gerarHash.js";
import { CurrentTypeInterface } from "../interfaces/requestInterface.js";

export const urlBase = "https://gateway.marvel.com/v1/public/";

export function createUrl(
  type: CurrentTypeInterface,
  term: string,
  offset: number,
  limit: number,
  orderBy: string
): string {
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
