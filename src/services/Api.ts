import { createUrl } from "../utils/createurl-utils.js";
import { CurrentTypeInterface } from "../interfaces/requestInterface.js";

export async function fetchFromAPI(
  type: CurrentTypeInterface,
  termo: string,
  offset: number,
  limit: number,
  orderBy = ""
) {
  const url = createUrl(type, termo, offset, limit, orderBy);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Erro na API: ${res.status} ${res.statusText}`);
  }

  const dados = await res.json();
  return { dados, url };
}
