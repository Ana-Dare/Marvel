export class ResultsInfoView {
  private el = document.getElementById("resultsInfo")!;

updateProgress(atual: number, total: number) {
    this.el.textContent = `Showing ${Math.min(atual, total)} of ${total} results.`;
  }
  
showAllLoaded(total: number) {
    this.el.textContent = `All ${total} results loaded.`;
  }

showAllresults(total: number) {
    this.el.textContent = `Showing all ${total} results.`;
  }
}
