import { ContenType } from "../interfaces/request-interface.js";

export function obterOrderBy(tipo: ContenType, filtroOrdenacao: string): string {
  switch (filtroOrdenacao) {
    case "Mais recente":
      return tipo === 'comics' ? 'onsaleDate' : 'modified';
    case "Mais antigo":
      return tipo === 'comics' ? '-onsaleDate' : '-modified';
    default:
      return '';
  }
}