import { ContenType } from "../interfaces/request-interface.js";
import { getData } from "../interfaces/getDataType.js";

export class ContentDataFetcher { // retorna os dados buscados
  constructor (
    private getData: getData // função usad apara getDatas
  ) {}

  
  fetchContent(type: ContenType, termo: string) { // dados que a função recebe
    return this.getData(type, termo); // dados que ela retorna
  }
}