export function mapComics(results) {
    return results.map((item) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return ({
            currentType: "comics",
            name: item.name || null,
            title: item.title || null,
            id: String(item.id),
            thumbnail: {
                path: (_a = item.thumbnail) === null || _a === void 0 ? void 0 : _a.path,
                extension: (_b = item.thumbnail) === null || _b === void 0 ? void 0 : _b.extension,
            },
            description: item.description || "",
            pageCount: item.pageCount || "Número de páginas indisponível",
            prices: {
                price: (_c = item.prices.price) !== null && _c !== void 0 ? _c : 'Valor indisponível',
                type: item.prices.type || "Tipo de preço indisponível",
            },
            characters: {
                available: item.characters.available || 0,
                collectionURI: item.characters.collectionURI || '',
                items: item.characters.items || []
            },
            series: {
                available: ((_d = item.series) === null || _d === void 0 ? void 0 : _d.available) || 0,
                collectionURI: ((_e = item.series) === null || _e === void 0 ? void 0 : _e.collectionURI) || "",
                items: ((_f = item.series) === null || _f === void 0 ? void 0 : _f.items) || [],
            },
            creators: {
                available: ((_g = item.creators) === null || _g === void 0 ? void 0 : _g.available) || 0,
                collectionURI: ((_h = item.creators) === null || _h === void 0 ? void 0 : _h.collectionURI) || "",
                items: ((_j = item.creators) === null || _j === void 0 ? void 0 : _j.items) || [],
            },
        });
    });
}
