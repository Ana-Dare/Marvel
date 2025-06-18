var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createUrl } from "../utils/createurl-utils.js";
import { cacheService } from "./cache-service.js";
export function consumeAPI(tipo_1, termo_1, offset_1, limit_1) {
    return __awaiter(this, arguments, void 0, function* (tipo, termo, offset, limit, orderBy = '', render) {
        const url = createUrl(tipo, termo, offset, limit, orderBy);
        const cachedResponse = cacheService.get(url);
        if (cachedResponse) {
            if (offset === 0)
                render.limpar();
            cachedResponse.itens.forEach((item) => render.render(item));
            return cachedResponse.total;
        }
        try {
            const res = yield fetch(url);
            if (!res.ok) {
                throw new Error(`Erro na API: ${res.status} ${res.statusText}`);
            }
            const dados = yield res.json();
            const total = dados.data.total;
            const result = dados.data.results;
            const itens = result.map((item) => {
                var _a, _b;
                return ({
                    currentType: tipo,
                    name: item.name,
                    title: item.title,
                    description: item.description,
                    thumbnail: {
                        path: ((_a = item.thumbnail) === null || _a === void 0 ? void 0 : _a.path) || null,
                        extension: ((_b = item.thumbnail) === null || _b === void 0 ? void 0 : _b.extension) || null
                    }
                });
            });
            cacheService.set(url, { itens, total });
            if (offset === 0)
                render.limpar();
            itens.forEach((item) => render.render(item));
            return total;
        }
        catch (error) {
            console.error("Erro na requisição:", error);
            return 0;
        }
    });
}
