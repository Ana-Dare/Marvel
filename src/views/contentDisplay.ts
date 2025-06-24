import { DataApi } from "../interfaces/request-interface.js";

export class ContentDisplay {
  constructor(private renderer: { // cria render e chama seus metodos
    render(item: DataApi): void;
    limpar(): void }) {}

  clearIfFirstPage(offset: number): void { // lógica para limpar qnd estiver com offset = 0
    if (offset === 0) {
      this.renderer.limpar();
    }
  }

  renderItems(itens: DataApi[]): void {
    itens.forEach(item => this.renderer.render(item)); // lkógica para renderizar
  }
}
