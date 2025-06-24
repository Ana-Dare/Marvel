export class ResultsInfoView {
    constructor() {
        this.el = document.getElementById("resultsInfo");
    }
    updateProgress(atual, total) {
        this.el.textContent = `Showing ${Math.min(atual, total)} of ${total} results.`;
    }
    showAllLoaded(total) {
        this.el.textContent = `All ${total} results loaded.`;
    }
    showAllresults(total) {
        this.el.textContent = `Showing all ${total} results.`;
    }
}
