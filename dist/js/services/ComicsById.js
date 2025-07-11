var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { hash, ts, publicKey } from "../utils/gerarHash.js";
import { urlBase } from "../utils/createurl-utils.js";
export function requestAllComics() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${urlBase}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`Erro ao buscar quadrinho: ${response.status}`);
            }
            const json = yield response.json();
            const result = json.data.results[0];
            return result;
        }
        catch (e) {
            console.error("Erro ao buscar quadrinho por ID:", e);
            return null;
        }
    });
}
export function requestComicsById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${urlBase}/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`Erro ao buscar quadrinho: ${response.status}`);
            }
            const json = yield response.json();
            const result = json.data.results[0];
            return result;
        }
        catch (e) {
            console.error("Erro ao buscar quadrinho por ID:", e);
            return null;
        }
    });
}
