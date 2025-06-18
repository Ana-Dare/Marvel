var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { buscarPersonagemPorId } from "../services/requestById.js";
export class DetailController {
    constructor(containerId) {
        const container = document.querySelector('#detail');
        if (!container) {
            throw new Error(`Container '${containerId}' não encontrado`);
        }
        this.container = container;
    }
    inicializar() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            if (!id) {
                this.container.innerHTML = `<p>Personagem não encontrado.</p>`;
                return;
            }
            const personagem = yield buscarPersonagemPorId(id);
            if (!personagem) {
                this.container.innerHTML = `<p>Erro ao carregar personagem.</p>`;
                return;
            }
            this.exibirDetalhes(personagem);
        });
    }
    exibirDetalhes(personagem) {
        this.container.innerHTML = `
      <h1>${personagem.name}</h1>
      <img src="${personagem.thumbnail.path}.${personagem.thumbnail.extension}" />
      <p>${personagem.description || "Sem descrição disponível"}</p>
    `;
    }
}
