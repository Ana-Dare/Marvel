export function setItemFavorite(favorite, objectFavorite) {
    try {
        const existingData = localStorage.getItem(favorite);
        let updateData = {};
        if (existingData) {
            const previousData = JSON.parse(existingData);
            for (const tipo in objectFavorite) {
                updateData[tipo] = Object.assign(Object.assign({}, previousData[tipo]), objectFavorite[tipo]);
            }
            for (const tipo in previousData) {
                if (!updateData[tipo]) {
                    updateData[tipo] = previousData[tipo];
                }
            }
        }
        else {
            updateData = objectFavorite;
        }
        localStorage.setItem(favorite, JSON.stringify(updateData));
    }
    catch (erro) {
        console.error("Erro ao adicionar dados", erro);
        throw erro;
    }
}
export function removeItemfavorite(favorite, type, id) {
    try {
        const existingData = localStorage.getItem(favorite);
        if (!existingData)
            return;
        const currentData = JSON.parse(existingData);
        if (currentData[type] && currentData[type][id]) {
            delete currentData[type][id];
        }
        if (Object.keys(currentData[type]).length === 0) {
            delete currentData[type];
        }
        localStorage.setItem(favorite, JSON.stringify(currentData));
    }
    catch (error) {
        console.error("Erro ao remover favorito:", error);
    }
}
export function isItemFavorite(storageKey, type, id) {
    var _a;
    const objectString = localStorage.getItem(storageKey);
    if (!objectString)
        return false;
    try {
        const object = JSON.parse(objectString);
        return !!((_a = object[type]) === null || _a === void 0 ? void 0 : _a[id]);
    }
    catch (_b) {
        return false;
    }
}
