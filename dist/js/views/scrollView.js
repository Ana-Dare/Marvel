export class ScrollView {
  constructor() {
    this.messageLoading = document.querySelector("#messageLoading");
    this.messageNoMoreResults = document.querySelector("#noMoreResults");
    this.buttons = [
      ...Array.from(document.querySelectorAll("button")),
      document.querySelector("#ordenacao"),
      document.querySelector("#search"),
    ].filter(Boolean);
  }
  showLoading() {
    this.messageLoading.style.display = "block";
    this.buttons.forEach((btn) => btn.setAttribute("disabled", "true"));
  }
  hideLoading() {
    this.messageLoading.style.display = "none";
    this.buttons.forEach((btn) => btn.removeAttribute("disabled"));
  }
  showEndResults() {
    this.messageNoMoreResults.style.display = "block";
  }
  HideEndResults() {
    this.messageNoMoreResults.style.display = "none";
  }
}
