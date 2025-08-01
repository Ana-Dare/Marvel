import { hash, ts, publicKey } from "../../utils/gerarHash.js";
import { urlBase } from "../../utils/createUrl.js";
import { Series } from "../../interfaces/requestInterface.js";

export async function requestSeriesById(id: string): Promise<Series | null> {
  const url = `${urlBase}/series/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro ao buscar serie: ${response.status}`);
  }

  const json = await response.json();
  const result = json.data.results[0];
  return result;
}
