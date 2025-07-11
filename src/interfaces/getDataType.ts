import { CurrentTypeInterface, DataApi } from "./requestInterface.js";

export type getDataType = (
  type: CurrentTypeInterface,
  termo: string
) => Promise<{ itens: DataApi[]; total: number }>;
