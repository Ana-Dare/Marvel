var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createUrl } from "../utils/createUrl.js";
export function fetchFromAPI(type_1, term_1, offset_1, limit_1) {
    return __awaiter(this, arguments, void 0, function* (type, term, offset, limit, orderBy = "") {
        const url = createUrl(type, term, offset, limit, orderBy);
        const res = yield fetch(url);
        if (!res.ok) {
            throw new Error(`Erro na API: ${res.status} ${res.statusText}`);
        }
        const dados = yield res.json();
        return { dados, url };
    });
}
