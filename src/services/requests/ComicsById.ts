import { hash, ts, publicKey } from "../../utils/gerarHash.js";
import { urlBase } from "../../utils/createUrl.js";
import { Comics } from "../../interfaces/requestInterface.js";

export async function requestComicsById(id: string): Promise<Comics | null> {
  const url = `${urlBase}/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar quadrinho: ${response.status}`);
    }

    const json = await response.json();
    const result = json.data.results[0];
    return result;
}
