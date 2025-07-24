import { CurrentTypeInterface } from "../interfaces/requestInterface.js";

export function obterOrderBy(
  tipo: CurrentTypeInterface,
  filtroOrdenacao: string
): string {
  switch (filtroOrdenacao) {
    case "Mais recentes":
      return tipo === "comics" ? "-onsaleDate" : "-modified";
    case "Mais antigos":
      return tipo === "comics" ? "onsaleDate" : "modified";
    case "A-Z":
      return tipo === "characters" ? "name" : "title";
    case "Z-A":
      return tipo === "characters" ? "-name" : "-title";

    default:
      return "";
  }
}
