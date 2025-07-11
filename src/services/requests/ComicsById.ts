import { hash, ts, publicKey } from "../../utils/gerarHash.js";
import { urlBase } from "../../utils/createurl-utils.js";

export async function requestComicsById(id: string) {
  const url = `${urlBase}/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar quadrinho: ${response.status}`);
    }

    const json = await response.json();
    const result = json.data.results[0];
    return result;
  } catch (e) {
    console.error("Erro ao buscar quadrinho por ID:", e);
    return null;
  }
}
