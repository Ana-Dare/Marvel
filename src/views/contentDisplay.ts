import { DataApi } from "../interfaces/requestInterface.js";

export class ContentDisplay {
  constructor(
    private renderer: {
      render(item: DataApi): void;
      limpar(): void;
    },
  ) {}

  clear(): void {
    this.renderer.limpar();
  }

  clearIfFirstPage(offset: number): void {
    if (offset === 0) {
      this.renderer.limpar();
    }
  }

  renderItems(itens: DataApi[]): void {
    itens.forEach((item) => this.renderer.render(item));
  }
}
