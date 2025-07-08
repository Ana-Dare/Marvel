export function mapCharacters(results) {
    return results.map((item) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return ({
            currentType: "characters",
            name: item.name || null,
            title: item.title || null,
            id: String(item.id),
            thumbnail: {
                path: (_a = item.thumbnail) === null || _a === void 0 ? void 0 : _a.path,
                extension: (_b = item.thumbnail) === null || _b === void 0 ? void 0 : _b.extension,
            },
            description: item.description || "",
            comics: {
                available: ((_c = item.comics) === null || _c === void 0 ? void 0 : _c.available) || 0,
                collectionURI: ((_d = item.comics) === null || _d === void 0 ? void 0 : _d.collectionURI) || "",
                items: ((_e = item.comics) === null || _e === void 0 ? void 0 : _e.items) || [],
            },
            series: {
                available: ((_f = item.series) === null || _f === void 0 ? void 0 : _f.available) || 0,
                collectionURI: ((_g = item.series) === null || _g === void 0 ? void 0 : _g.collectionURI) || "",
                items: ((_h = item.series) === null || _h === void 0 ? void 0 : _h.items) || [],
            },
        });
    });
}
