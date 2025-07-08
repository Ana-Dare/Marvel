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
const API_KEY = "SUA_API_KEY";
const ts = "1";
const hash = "SEU_HASH";
export function buscarPersonagemPorId(id) {
  return __awaiter(this, void 0, void 0, function* () {
    var _a, _b;
    const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${API_KEY}&hash=${hash}`;
    try {
      const response = yield fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ao buscar personagem: ${response.status}`);
      }
      const json = yield response.json();
      const result = json.data.results[0];
      const personagem = {
        currentType: "characters",
        name: result.name,
        title: result.title,
        description: result.description,
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
      };
      return personagem;
    } catch (e) {
      console.error("Erro ao buscar personagem por ID:", e);
      return null;
    }
  });
}
