import { ContenType } from "../interfaces/request-interface.js";

export function obterOrderBy(tipo: ContenType, filtroOrdenacao: string): string {
  switch (filtroOrdenacao) {
    case "Mais recente":
      return tipo === 'comics' ? '-onsaleDate' : '-modified';
    case "Mais antigo":
      return tipo === 'comics' ? 'onsaleDate' : 'modified';
    default:
      return '';
  }
}
//https://gateway.marvel.com/v1/public/comics?ts=1749738440&apikey=4c723e68f4806c04f72c9f956ec22ba1&hash=82c93e4c8f8ed3ce640e7b100e4684f1&limit=10&offset=30&orderBy=onsaleDate&titleStartsWith=spider