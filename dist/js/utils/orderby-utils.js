export function obterOrderBy(tipo, filtroOrdenacao) {
    switch (filtroOrdenacao) {
        case "Mais recente":
            return tipo === 'comics' ? 'onsaleDate' : '-modified';
        case "Mais antigo":
            return tipo === 'comics' ? '-onsaleDate' : 'modified';
        default:
            return '';
    }
}
