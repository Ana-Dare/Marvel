export function mapApiResults(results, type) {
    return results.map((item) => {
        var _a, _b;
        return ({
            currentType: type,
            name: item.name,
            title: item.title,
            id: item.id,
            thumbnail: {
                path: ((_a = item.thumbnail) === null || _a === void 0 ? void 0 : _a.path) || null,
                extension: ((_b = item.thumbnail) === null || _b === void 0 ? void 0 : _b.extension) || null,
            },
        });
    });
}
