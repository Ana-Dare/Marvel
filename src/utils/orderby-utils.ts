import { ContenType } from "../interfaces/request-interface.js";

export function obterOrderBy(tipo: ContenType, filtroOrdenacao: string): string {
  switch (filtroOrdenacao) {
    case "Mais recente":
      return tipo === 'comics' ? '-onsaleDate' : '-modified';
    case "Mais antigo":
      return tipo === 'comics' ? 'onsaleDate' : 'modified';
    case "A-Z":
      return tipo === 'characters' ? 'name' : 'title';
   case "Z-A":
      return tipo === 'characters' ? '-name' : '-title';
    
    default:
      return '';
  }
}