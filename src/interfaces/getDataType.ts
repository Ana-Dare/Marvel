import { ContentType, DataApi } from "./requestInterface.js";

export type getDataType = (
  type: ContentType,
  termo: string,
) => Promise<{ itens: DataApi[]; total: number }>;
