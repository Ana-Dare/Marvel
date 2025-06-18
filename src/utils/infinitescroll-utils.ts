type CallbackScroll = () => void;

export class InfiniteScroll {
    private scrollOffset: number;
    private callback: CallbackScroll;
    private isLoading: boolean;
    private message: HTMLElement
    private container: HTMLElement;

    constructor(callback: CallbackScroll, container: HTMLElement, scrollOffset: number = 100) {
        this.callback =  callback;
        this.scrollOffset = scrollOffset;
        this.container = container;

        this.message = document.createElement('div');
        this.message.classList.add('scroll-message');
        this.message.style.display = 'none';
        this.container.appendChild(this.message);
    }

    public startEvent() {
        window.addEventListener('scroll', () => {
            if (this.isLoading) return;
        const isNearPageEnd = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - this.scrollOffset);

            if (isNearPageEnd) {
                this.isLoading = true;
                this.callback();
            }
        });
    }

    public unlock() {
        this.isLoading = false;
    }

    public lock() {
        this.isLoading = true;
    }

}

