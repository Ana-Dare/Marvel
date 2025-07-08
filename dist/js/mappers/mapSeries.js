export function mapSeries(results) {
    return results.map((item) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return ({
            currentType: "series",
            name: item.name || null,
            title: item.title || null,
            id: String(item.id),
            thumbnail: {
                path: (_a = item.thumbnail) === null || _a === void 0 ? void 0 : _a.path,
                extension: (_b = item.thumbnail) === null || _b === void 0 ? void 0 : _b.extension,
            },
            description: item.description || "",
            pageCount: item.pageCount || "",
            startYear: item.startYear || "",
            endYear: item.endYear || "",
            creators: {
                available: ((_c = item.creators) === null || _c === void 0 ? void 0 : _c.available) || 0,
                collectionURI: ((_d = item.creators) === null || _d === void 0 ? void 0 : _d.collectionURI) || "",
                items: ((_e = item.creators) === null || _e === void 0 ? void 0 : _e.items) || [],
            },
            characters: {
                available: ((_f = item.comics) === null || _f === void 0 ? void 0 : _f.available) || 0,
                collectionURI: ((_g = item.comics) === null || _g === void 0 ? void 0 : _g.collectionURI) || "",
                items: ((_h = item.comics) === null || _h === void 0 ? void 0 : _h.items) || [],
            },
            comics: {
                available: ((_j = item.comics) === null || _j === void 0 ? void 0 : _j.available) || 0,
                collectionURI: ((_k = item.comics) === null || _k === void 0 ? void 0 : _k.collectionURI) || "",
                items: ((_l = item.comics) === null || _l === void 0 ? void 0 : _l.items) || [],
            },
        });
    });
}
