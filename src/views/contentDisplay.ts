import { DataApi } from "../interfaces/requestInterface.js";

export class ContentDisplay {
  constructor(
    private renderer: {
      render(item: DataApi): void;
      toClean(): void;
    }
  ) {}

  clearIfFirstPage(offset: number): void {
    if (offset === 0) {
      this.renderer.toClean();
    }
  }

  renderItems(itens: DataApi[]): void {
    itens.forEach((item) => this.renderer.render(item));
  }
}
