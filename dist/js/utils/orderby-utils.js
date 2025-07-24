export function obterOrderBy(tipo, filtroOrdenacao) {
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
