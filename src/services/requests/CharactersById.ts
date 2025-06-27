import { Characters } from "../../interfaces/requestInterface.js";
import { hash, ts, apiKey, baseUrl } from "../../constants/globais.js";

export async function requestCharactersById(id: string) {
  const url = `${baseUrl}/characters/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

  try {
    const response = await fetch(url);
    console.log(url)
    if (!response.ok) {
      throw new Error(`Erro ao buscar personagem: ${response.status}`);
    }

    const json = await response.json();
    const result = json.data.results[0];
    return result;
   
  } catch (e) {
    console.error("Erro ao buscar personagem por ID:", e);
    return null;
  }
}

