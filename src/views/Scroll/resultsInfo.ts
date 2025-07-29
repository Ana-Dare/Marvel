export class resultsInfo {
  private resultMessage = document.querySelector(
    ".results-info"
  ) as HTMLDivElement;

  updateProgress(atual: number, total: number) {
    this.resultMessage.style.display = "flex";
    this.resultMessage.innerHTML = `<img src = './img/eye.png' class ='icon-eye'> Exibindo ${Math.min(atual, total)} de ${total} resultados.`;
  }

  showAllLoaded(total: number) {
    this.resultMessage.style.display = "flex";
    this.resultMessage.innerHTML = `Todos ${total} os resultados carregados.`;
  }

  showAllresults(total: number) {
    this.resultMessage.style.display = "flex";
    this.resultMessage.innerHTML = `Exibindo ${total} resultados.`;
  }

  hideResults() {
    this.resultMessage.style.display = "none";
  }
}
