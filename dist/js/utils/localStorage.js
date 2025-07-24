export function setItemFavorite(favorite, objectFavorite) {
    const tooltipSaved = document.querySelector('.tooltip-saved');
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
        if (tooltipSaved) {
            tooltipSaved.style.display = "block";
            tooltipSaved.style.opacity = "1";
            setTimeout(() => {
                tooltipSaved.style.opacity = "0";
                setTimeout(() => {
                    tooltipSaved.style.display = "none";
                }, 200);
            }, 1000);
        }
    }
    catch (erro) {
        console.error("Erro ao adicionar dados", erro);
        throw erro;
    }
}
export function removeItemfavorite(favorite, type, id) {
    var _a, _b;
    try {
        const tooltipNotSaved = document.querySelector(".tooltip-not-saved");
        const existingData = localStorage.getItem(favorite);
        if (!existingData)
            return;
        const currentData = JSON.parse(existingData);
        if (currentData[type] && ((_a = currentData[type]) === null || _a === void 0 ? void 0 : _a[id])) {
            delete currentData[type][id];
        }
        if (Object.keys((_b = currentData[type]) !== null && _b !== void 0 ? _b : {}).length === 0) {
            delete currentData[type];
        }
        localStorage.setItem(favorite, JSON.stringify(currentData));
        if (tooltipNotSaved) {
            tooltipNotSaved.style.display = "block";
            tooltipNotSaved.style.opacity = "1";
            setTimeout(() => {
                tooltipNotSaved.style.opacity = "0";
                setTimeout(() => {
                    tooltipNotSaved.style.display = "none";
                }, 200);
            }, 1000);
        }
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
