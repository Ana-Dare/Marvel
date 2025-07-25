export function obterOrderBy(type, filterOrder) {
    switch (filterOrder) {
        case "Mais recentes":
            return type === "comics" ? "-onsaleDate" : "-modified";
        case "Mais antigos":
            return type === "comics" ? "onsaleDate" : "modified";
        case "A-Z":
            return type === "characters" ? "name" : "title";
        case "Z-A":
            return type === "characters" ? "-name" : "-title";
        default:
            return "";
    }
}
