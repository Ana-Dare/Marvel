export class ResultsInfoView {
  constructor() {
    this.resultMessage = document.getElementById("resultsInfo");
  }
  updateProgress(atual, total) {
    this.resultMessage.textContent = `Exibindo ${Math.min(atual, total)} de ${total} resultados.`;
  }
  showAllLoaded(total) {
    this.resultMessage.textContent = `Todos ${total} os resultados carregados.`;
  }
  showAllresults(total) {
    this.resultMessage.textContent = `Exibindo ${total} results.`;
  }
}
