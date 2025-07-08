var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { hash, ts, apiKey, baseUrl } from "../../constants/globais.js";
export function buscarPersonagemPorId(id) {
  return __awaiter(this, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const url = `${baseUrl}/characters/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
    try {
      const response = yield fetch(url);
      console.log(url);
      if (!response.ok) {
        throw new Error(`Erro ao buscar personagem: ${response.status}`);
      }
      const json = yield response.json();
      const result = json.data.results[0];
      const personagem = {
        currentType: "characters",
        name: result.name,
        title: result.title,
        id: result.id,
        thumbnail: {
          path:
            ((_a = result.thumbnail) === null || _a === void 0
              ? void 0
              : _a.path) || null,
          extension:
            ((_b = result.thumbnail) === null || _b === void 0
              ? void 0
              : _b.extension) || null,
        },
        description: " ",
        comics: {
          available:
            ((_c = result.comics) === null || _c === void 0
              ? void 0
              : _c.available) || 0,
          collectionURI:
            ((_d = result.comics) === null || _d === void 0
              ? void 0
              : _d.collectionURI) || "",
          items: result.comics.items || [],
        },
        series: {
          available:
            ((_e = result.series) === null || _e === void 0
              ? void 0
              : _e.available) || 0,
          collectionURI:
            ((_f = result.serie) === null || _f === void 0
              ? void 0
              : _f.collectionURI) || "",
          items: result.series.items || [],
        },
      };
      return personagem;
    } catch (e) {
      console.error("Erro ao buscar personagem por ID:", e);
      return null;
    }
  });
}
