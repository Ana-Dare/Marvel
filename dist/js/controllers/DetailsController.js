var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { requestCharactersById } from "../services/requests/CharactersById.js";
import { RenderCharacters } from "../views/Render/charactersRender.js";
import { mapCharacters } from "../mappers/mapCharacters.js";
export class CharactersController {
    constructor(container) {
        this.container = container;
        this.renderer = new RenderCharacters(container);
    }
    initialize(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rawCharacter = yield requestCharactersById(id);
                if (!rawCharacter) {
                    this.container.innerHTML = "<p>Personagem não encontrado.</p>";
                    return;
                }
                const [characters] = mapCharacters([rawCharacter]);
                this.renderer.renderCharacters(characters);
            }
            catch (error) {
                console.error("Erro ao inicializar personagem:", error);
                this.container.innerHTML = "<p>Erro ao carregar personagem.</p>";
            }
        });
    }
}
