export class LoadingUI {
  private elementsToDisable: (
    | HTMLButtonElement
    | HTMLInputElement
    | HTMLSelectElement
  )[];

  constructor() {
    this.elementsToDisable = [
      document.querySelector("#buscar") as HTMLButtonElement,
      document.querySelector("#search") as HTMLInputElement,
      document.querySelector("#selec-order") as HTMLSelectElement,
      document.querySelector("#personagens") as HTMLButtonElement,
      document.querySelector("#series") as HTMLButtonElement,
      document.querySelector("#quadrinhos") as HTMLButtonElement,
      document.querySelector("#reset-search") as HTMLButtonElement,
    ].filter(Boolean);
  }

  public disableUI() {
    this.elementsToDisable.forEach((el) => (el.disabled = true));
  }

  public enableUI() {
    this.elementsToDisable.forEach((el) => (el.disabled = false));
  }
}
