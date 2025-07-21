export class ScrollView {
    constructor() {
        this.messageLoading = document.querySelector(".container-spinner");
        this.messageNoMoreResults = document.querySelector("#noMoreResults");
        this.buttons = [
            ...Array.from(document.querySelectorAll("button")),
            document.querySelector("#selec-order"),
            document.querySelector("#search"),
        ].filter(Boolean);
    }
    showLoading() {
        this.messageLoading.style.display = "flex";
        this.buttons.forEach((btn) => btn.setAttribute("disabled", "true"));
    }
    hideLoading() {
        this.messageLoading.style.display = "none";
        this.buttons.forEach((btn) => btn.removeAttribute("disabled"));
    }
    showEndResults() {
        this.messageNoMoreResults.innerHTML =
            "Todos os resultados foram carregados.";
        this.messageNoMoreResults.style.display = "block";
    }
    showNoResults() {
        this.messageNoMoreResults.innerHTML = 'Não foi possível encontrar resultados.';
        this.messageNoMoreResults.style.display = "block";
    }
    HideEndResults() {
        this.messageNoMoreResults.style.display = "none";
    }
}
