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
import { renderData } from "../views/render-data.js";
const content = document.querySelector('#exibir');
export function consumeAPI(tipo_1, termo_1, offset_1) {
    return __awaiter(this, arguments, void 0, function* (tipo, termo, offset, orderBy = '') {
        let url = crateUrl(tipo, termo, offset, 10, orderBy);
        try {
            const res = yield fetch(url);
            const dados = yield res.json();
            const result = dados.data.results;
            console.log(url);
            console.log(result);
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
            itens.forEach((item) => renderData(item));
        }
        catch (error) {
            console.error("Erro na requisição:", error);
        }
    });
}
