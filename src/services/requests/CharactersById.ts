import { hash, ts, publicKey } from "../../utils/gerarHash.js";
import { urlBase } from "../../utils/createUrl.js";
import { Characters } from "../../interfaces/requestInterface.js";

export async function requestCharactersById(
  id: string
): Promise<Characters | null> {
  const url = `${urlBase}/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao buscar personagem: ${response.status}`);
  }

  const json = await response.json();
  const result = json.data.results[0];
  return result;
}
