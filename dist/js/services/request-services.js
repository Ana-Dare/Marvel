var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { crateUrl } from "../utils/createurl-utils.js";
export const statusResults = {
    currentType: 'characters',
    currentTerm: '',
    offset: 0,
    total: null,
    limit: 10,
    loading: false
};
export function consumeAPI(tipo_1, termo_1, offset_1) {
    return __awaiter(this, arguments, void 0, function* (tipo, termo, offset, orderBy = '') {
        const url = crateUrl('characters', 'sp', offset, statusResults.limit, orderBy);
        try {
            const res = yield fetch(url);
            const dados = yield res.json();
            const result = dados.data.results;
            console.log(result);
        }
        catch (error) {
            console.error("Erro na requisição:", error);
        }
    });
}
