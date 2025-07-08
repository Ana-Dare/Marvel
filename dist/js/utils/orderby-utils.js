export function obterOrderBy(tipo, filtroOrdenacao) {
    switch (filtroOrdenacao) {
        case "Mais recente":
            return tipo === "comics" ? "-onsaleDate" : "-modified";
        case "Mais antigo":
            return tipo === "comics" ? "onsaleDate" : "modified";
        case "A-Z":
            return tipo === "characters" ? "name" : "title";
        case "Z-A":
            return tipo === "characters" ? "-name" : "-title";
        default:
            return "";
    }
}
