export class ResultsInfoView {
    constructor() {
        this.resultMessage = document.querySelector(".results-info");
    }
    updateProgress(atual, total) {
        this.resultMessage.style.display = "block";
        this.resultMessage.innerHTML = `<img src = './img/eye.png' class ='icon'> Exibindo ${Math.min(atual, total)} de ${total} resultados.`;
    }
    showAllLoaded(total) {
        this.resultMessage.style.display = "block";
        this.resultMessage.innerHTML = `Todos ${total} os resultados carregados.`;
    }
    showAllresults(total) {
        this.resultMessage.style.display = "block";
        this.resultMessage.innerHTML = `<span class= 'icon'><img src='./img/eye.png'></span> Exibindo ${total} resultados.`;
    }
    hideResults() {
        this.resultMessage.style.display = "none";
    }
}
