import { ContenType, DataApi } from "./request-interface.js" 

export type getData = (
  type: ContenType,
  termo: string
) => Promise<{ itens: DataApi[]; total: number }>;