export class resultsInfo {
    constructor() {
        this.resultMessage = document.querySelector(".results-info");
    }
    updateProgress(atual, total) {
        this.resultMessage.style.display = "flex";
        this.resultMessage.innerHTML = `<img src = './img/eye.png' class ='icon-eye'> Exibindo ${Math.min(atual, total)} de ${total} resultados.`;
    }
    showAllLoaded(total) {
        this.resultMessage.style.display = "flex";
        this.resultMessage.innerHTML = `Todos ${total} os resultados carregados.`;
    }
    showAllresults(total) {
        this.resultMessage.style.display = "flex";
        this.resultMessage.innerHTML = `Exibindo ${total} resultados.`;
    }
    hideResults() {
        this.resultMessage.style.display = "none";
    }
}
