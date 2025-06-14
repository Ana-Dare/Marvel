import { crateUrl } from "../utils/createurl-utils.js";
import { ContenType } from "../interfaces/request-interface.js";
import { StatusResults } from "../interfaces/request-interface.js";

export const statusResults: StatusResults = {
  currentType: 'characters',
  currentTerm: '',
  offset: 0,
  total: null,
  limit: 10,
  loading: false
};

export async function consumeAPI(tipo: ContenType, termo: string, offset: number, orderBy = ''): Promise<void> {
 const url = crateUrl ('characters', 'sp', offset, statusResults.limit, orderBy);
  
  try {
    const res = await fetch(url);
    const dados = await res.json();
    const result = dados.data.results;
    console.log(result);
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}
