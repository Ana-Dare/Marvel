import { DataApi } from "./requestInterface.js";

export interface CachedResponse {
  itens: DataApi[];
  total: number;
}
