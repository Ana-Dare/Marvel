export class ScrollView {
  constructor() {
    this.message = document.querySelector("#messageLoading");
    this.buttons = [
      ...Array.from(document.querySelectorAll("button")),
      document.querySelector("#ordenacao"),
      document.querySelector("#search"),
    ].filter(Boolean);
  }
  showLoading() {
    this.message.style.display = "block";
    this.buttons.forEach((btn) => btn.setAttribute("disabled", "true"));
  }
  hideLoading() {
    this.message.style.display = "none";
    this.buttons.forEach((btn) => btn.removeAttribute("disabled"));
  }
}
