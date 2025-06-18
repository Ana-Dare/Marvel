var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { cacheService } from "./cache-service.js";
import { createUrl } from "../utils/createurl-utils.js";
export class MarvelApiService {
    _transformResults(results, tipo) {
        return results.map((item) => {
            var _a, _b;
            return ({
                currentType: tipo,
                name: item.name || item.title,
                title: item.title,
                description: item.description,
                thumbnail: {
                    path: ((_a = item.thumbnail) === null || _a === void 0 ? void 0 : _a.path) || null,
                    extension: ((_b = item.thumbnail) === null || _b === void 0 ? void 0 : _b.extension) || null
                }
            });
        });
    }
    _generateCacheKey(tipo, termo, offset, limit, orderBy) {
        return `${tipo}:${termo}:offset=${offset}:limit=${limit}:order=${orderBy}`;
    }
    fetchContent(tipo_1, termo_1, offset_1, limit_1) {
        return __awaiter(this, arguments, void 0, function* (tipo, termo, offset, limit, orderBy = '') {
            const cacheKey = this._generateCacheKey(tipo, termo, offset, limit, orderBy);
            if (cacheService.has(cacheKey)) {
                return Promise.resolve(cacheService.get(cacheKey));
            }
            const url = createUrl(tipo, termo, offset, limit, orderBy);
            console.log(`[MarvelApiService] Cache MISS. Fetching from network: ${url}`);
            try {
                const res = yield fetch(url);
                if (!res.ok) {
                    throw new Error('Erro na requisição');
                }
                const dados = yield res.json();
                const items = this._transformResults(dados.data.results, tipo);
                const total = dados.data.total;
                const response = { items, total };
                cacheService.set(cacheKey, response);
                return response;
            }
            catch (error) {
                console.error("Erro ao buscar e processar dados da API:", error);
                throw error;
            }
        });
    }
}
