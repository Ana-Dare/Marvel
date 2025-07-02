export class ResultsInfoView {
  private resultMessage  = document.getElementById("resultsInfo")!;

updateProgress(atual: number, total: number) {
    this.resultMessage.textContent = `Exibindo ${Math.min(atual, total)} de ${total} resultados.`;
  }
  
showAllLoaded(total: number) {
    this.resultMessage.textContent = `Todos ${total} os resultados carregados.`;
  }

showAllresults(total: number) {
    this.resultMessage.textContent = `Exibindo ${total} results.`;
  }
}
