
import { requestCharactersById } from "../services/requests/CharactersById.js";
import { RenderCharacters } from "../views/Render/charactersRender.js";
import { mapCharacters } from "../mappers/mapCharacters.js";

export class CharactersController {
  private renderer: RenderCharacters;

  constructor(private container: HTMLElement) {
    this.renderer = new RenderCharacters(container);
  }

  public async initialize(id: string) {
    try {
      // 1. Buscar personagem bruto
      const rawCharacter = await requestCharactersById(id);
      if (!rawCharacter) {
        this.container.innerHTML = "<p>Personagem não encontrado.</p>";
        return;
      }

      // 2. Mapear para seu tipo Characters
      const [characters] = mapCharacters([rawCharacter]);

      // 3. Renderizar o personagem
      this.renderer.renderCharacters(characters);

    } catch (error) {
      console.error("Erro ao inicializar personagem:", error);
      this.container.innerHTML = "<p>Erro ao carregar personagem.</p>";
    }
  }
}
