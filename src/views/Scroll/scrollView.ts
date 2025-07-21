export class ScrollView {
  private messageLoading: HTMLElement;
  private messageNoMoreResults: HTMLElement;
  private buttons: HTMLElement[];

  constructor() {
    this.messageLoading = document.querySelector(".container-spinner")!;
    this.messageNoMoreResults = document.querySelector("#noMoreResults")!;
    this.buttons = [
      ...Array.from(document.querySelectorAll("button")),
      document.querySelector("#selec-order") as HTMLElement,
      document.querySelector("#search") as HTMLElement,
    ].filter(Boolean) as HTMLElement[];
  }

  public showLoading() {
    this.messageLoading.style.display = "flex";
    this.buttons.forEach((btn) => btn.setAttribute("disabled", "true"));
  }

  public hideLoading() {
    this.messageLoading.style.display = "none";
    this.buttons.forEach((btn) => btn.removeAttribute("disabled"));
  }

  public showEndResults() {
    this.messageNoMoreResults.innerHTML =
      "Todos os resultados foram carregados.";
    this.messageNoMoreResults.style.display = "block";
  }

  public showNoResults() {
    this.messageNoMoreResults.innerHTML = 'Não foi possível encontrar resultados.'
    this.messageNoMoreResults.style.display = "block";
  }

  public HideEndResults() {
    this.messageNoMoreResults.style.display = "none";
  }
}
