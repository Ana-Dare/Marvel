import { DataApi } from "../interfaces/request-interface.js";
import { hash, ts, apiKey, baseUrl } from "../constants/globais.js";

export async function buscarPersonagemPorId(id: string): Promise<DataApi | null> {
  const url = `${baseUrl}/characters/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar personagem: ${response.status}`);
    }

    const json = await response.json();
    const result = json.data.results[0];

    const personagem: DataApi = {
      currentType: "characters", 
      name: result.name,
      title: result.title,
      description: result.description,
      id: result.id,
      thumbnail: {
        path: result.thumbnail?.path || null,
        extension: result.thumbnail?.extension || null
      }
    };

    return personagem;
  } catch (e) {
    console.error("Erro ao buscar personagem por ID:", e);
    return null;
  }
}
