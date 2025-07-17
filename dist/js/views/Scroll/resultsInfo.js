export class ResultsInfoView {
    constructor() {
        this.resultMessage = document.getElementById("resultsInfo");
    }
    updateProgress(atual, total) {
        this.resultMessage.style.display = "block";
        this.resultMessage.textContent = `Exibindo ${Math.min(atual, total)} de ${total} resultados.`;
    }
    showAllLoaded(total) {
        this.resultMessage.style.display = "block";
        this.resultMessage.textContent = `Todos ${total} os resultados carregados.`;
    }
    showAllresults(total) {
        this.resultMessage.style.display = "block";
        this.resultMessage.textContent = `Exibindo ${total} resultados.`;
    }
    hideResults() {
        this.resultMessage.style.display = "none";
    }
}
