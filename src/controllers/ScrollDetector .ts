export class ScrollDetector {
  private isLoading = false;
  private scrollOffset: number;
  private callback: () => Promise<void> | void;

  constructor(callback: () => Promise<void> | void, scrollOffset = 100) {
    this.callback = callback;
    this.scrollOffset = scrollOffset;
  }

  public start() {
    window.addEventListener('scroll', async () => {
      if (this.isLoading) return;
      const isNearEnd = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - this.scrollOffset);
      if (isNearEnd) {
        this.isLoading = true;
        await this.callback();
        this.isLoading = false;
      }
    });
  }

  public lock() {
    this.isLoading = true;
  }

  public unlock() {
    this.isLoading = false;
  }
}
