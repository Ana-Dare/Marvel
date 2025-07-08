export class FavoriteItem {
    getFavoriteItem(id) {
        let dataLocalStorage = [];
        try {
            dataLocalStorage = JSON.parse(localStorage.getItem("characters") || "");
        }
        catch (error) {
            return false;
        }
        const characters = dataLocalStorage;
        return characters.includes(id);
    }
    setFavoriteItem(type, id) {
        var _a;
        const storageKey = "favorites";
        let dataLocalStorage = [];
        try {
            dataLocalStorage = JSON.parse((_a = localStorage.getItem(storageKey)) !== null && _a !== void 0 ? _a : "{}");
        }
        catch (error) {
            console.warn("Erro ao ler localStorage.");
        }
        if (!dataLocalStorage[type]) {
            dataLocalStorage[type] = {};
        }
        dataLocalStorage[type][id] = dataLocalStorage;
        localStorage.setItem(storageKey, JSON.stringify(dataLocalStorage));
    }
    buscarItemFavorito(tipo, id) {
        var _a, _b, _c;
        const storageKey = "favoritos";
        try {
            const data = JSON.parse((_a = localStorage.getItem(storageKey)) !== null && _a !== void 0 ? _a : "{}");
            return (_c = (_b = data[tipo]) === null || _b === void 0 ? void 0 : _b[id]) !== null && _c !== void 0 ? _c : null;
        }
        catch (error) {
            console.error("Erro ao buscar item favorito:", error);
            return null;
        }
    }
}
