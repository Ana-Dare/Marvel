export class LoadingUI {
  private elementsToDisable: (
    | HTMLButtonElement
    | HTMLInputElement
    | HTMLSelectElement
  )[];
  private logoMarvel: HTMLDivElement;
  private btnHomeFavorite : HTMLButtonElement;

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
    this.btnHomeFavorite = document.querySelector('.btn-favorite-home') as HTMLButtonElement;
  }

  public disableUI() {
    this.elementsToDisable.forEach((el) => (el.disabled = true));
    this.elementsToDisable.forEach((el) => (el.style.pointerEvents = 'none'));
    this.logoMarvel.style.pointerEvents = 'none';
    this.btnHomeFavorite.style.pointerEvents = 'none';
  }

  public enableUI() {
    this.elementsToDisable.forEach((el) => (el.disabled = false));
    this.elementsToDisable.forEach((el) => (el.style.pointerEvents = 'auto'));
    this.logoMarvel.style.pointerEvents = 'auto';
    this.btnHomeFavorite.style.pointerEvents = 'auto';
  }
}
