import { createUrl } from "../utils/createUrl.js";
import { CurrentTypeInterface } from "../interfaces/requestInterface.js";

export async function fetchFromAPI(
  type: CurrentTypeInterface,
  term: string,
  offset: number,
  limit: number,
  orderBy = ""
) {
  const url = createUrl(type, term, offset, limit, orderBy);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Erro na API: ${res.status} ${res.statusText}`);
  }

  const dados = await res.json();
  return { dados, url };
}
