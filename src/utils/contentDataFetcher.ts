import { CurrentTypeInterface } from "../interfaces/requestInterface.js";
import { getDataType } from "../interfaces/getDataType.js";

export class ContentDataFetcher {
  constructor(private getData: getDataType) {}

  async fetchContent(type: CurrentTypeInterface, termo: string) {
    return this.getData(type, termo);
  }
}
