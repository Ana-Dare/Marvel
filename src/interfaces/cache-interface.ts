import { DataApi } from "./request-interface.js";

export interface CachedResponse {
  itens: DataApi[];
  total: number;
}