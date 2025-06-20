import { DataApi } from "../interfaces/request-interface.js";
import { buscarPersonagemPorId } from "../services/requestById.js";

export class DetailController {
    private container: HTMLElement

    constructor(containerId: string) {
    const container = document.querySelector('#detail') as HTMLElement;
    if (!container) {
      throw new Error(`Container '${containerId}' não encontrado`);
    }
    this.container = container;
  }

  public async inicializar() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
      this.container.innerHTML = `<p>Personagem não encontrado.</p>`;
      return;
    }

    const personagem = await buscarPersonagemPorId(id);
    if (!personagem) {
      this.container.innerHTML = `<p>Erro ao carregar personagem.</p>`;
      return;
    }

    this.exibirDetalhes(personagem);
  }

  private exibirDetalhes(personagem: DataApi) {
    this.container.innerHTML = `
      <h1>${personagem.name}</h1>
      <img src="${personagem.thumbnail.path}.${personagem.thumbnail.extension}" />
      <p>${personagem.description || "Sem descrição disponível"}</p>
    `;
  }
}