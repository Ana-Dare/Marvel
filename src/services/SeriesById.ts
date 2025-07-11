import { hash, ts, publicKey } from "../utils/gerarHash.js";
import { urlBase } from "../utils/createurl-utils.js";

export async function requestSeriesById(id: string) {
  const url = `${urlBase}/series/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar serie: ${response.status}`);
    }

    const json = await response.json();
    const result = json.data.results[0];
    return result;
  } catch (e) {
    console.error("Erro ao buscar serie por ID:", e);
    return null;
  }
}
