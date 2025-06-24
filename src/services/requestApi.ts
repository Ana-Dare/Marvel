import { createUrl } from "../utils/createurl-utils.js";
import { ContenType } from "../interfaces/request-interface.js";

export async function fetchFromAPI(
  tipo: ContenType,
  termo: string,
  offset: number,
  limit: number,
  orderBy = ''
) {
  const url = createUrl(tipo, termo, offset, limit, orderBy);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Erro na API: ${res.status} ${res.statusText}`);
  }

  const dados = await res.json();
  return { dados, url };
}
