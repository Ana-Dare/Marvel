export class ResultsInfoView {
  private resultMessage = document.querySelector(".resultsInfo") as HTMLDivElement;

  updateProgress(atual: number, total: number) {
    this.resultMessage.style.display = "block";
    this.resultMessage.textContent = `Exibindo ${Math.min(atual, total)} de ${total} resultados.`;
  }

  showAllLoaded(total: number) {
    this.resultMessage.style.display = "block";
    this.resultMessage.textContent = `Todos ${total} os resultados carregados.`;
  }

  showAllresults(total: number) {
    this.resultMessage.style.display = "block";
    this.resultMessage.textContent = `Exibindo ${total} resultados.`;
  }

  hideResults() {
    this.resultMessage.style.display = "none";
  }
}
