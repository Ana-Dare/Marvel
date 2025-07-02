export class ScrollView {
  private messageLoading: HTMLElement;
  private messageNoMoreResults: HTMLElement;
  private buttons: HTMLElement[];

  constructor() {
    this.messageLoading = document.querySelector('#messageLoading')!;
    this.messageNoMoreResults = document.querySelector('#noMoreResults')!;
    this.buttons = [
      ...Array.from(document.querySelectorAll('button')),
      document.querySelector('#ordenacao') as HTMLElement,
      document.querySelector('#search') as HTMLElement,
    ].filter(Boolean) as HTMLElement[];
  }

  public showLoading() {
    this.messageLoading.style.display = 'block';
    this.buttons.forEach(btn => btn.setAttribute('disabled', 'true'));
  }

  public hideLoading() {
    this.messageLoading.style.display = 'none';
    this.buttons.forEach(btn => btn.removeAttribute('disabled'));
  }

  public showEndResults() {
    this.messageNoMoreResults.style.display= 'block';
  }

  public HideEndResults() {
    this.messageNoMoreResults.style.display= 'none';
  }
}
