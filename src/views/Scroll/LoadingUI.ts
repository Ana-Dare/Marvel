export class LoadingUI {
  private elementsToDisable: (
    | HTMLButtonElement
    | HTMLInputElement
    | HTMLSelectElement
  )[];
  private logoMarvel: HTMLDivElement;

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
    this.logoMarvel = document.querySelector('.logo-marvel') as HTMLDivElement;
  }

  public disableUI() {
    this.elementsToDisable.forEach((el) => (el.disabled = true));
    this.logoMarvel.style.pointerEvents = 'none';
  }

  public enableUI() {
    this.elementsToDisable.forEach((el) => (el.disabled = false));
    this.logoMarvel.style.pointerEvents = 'auto';
  }
}
