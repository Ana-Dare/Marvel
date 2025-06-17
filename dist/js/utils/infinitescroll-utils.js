export class InfiniteScroll {
    constructor(callback, container, scrollOffset = 100) {
        this.callback = callback;
        this.scrollOffset = scrollOffset;
        this.container = container;
        this.message = document.createElement('div');
        this.message.classList.add('scroll-message');
        this.message.style.display = 'none';
        this.container.appendChild(this.message);
    }
    startEvent() {
        window.addEventListener('scroll', () => {
            if (this.isLoading)
                return;
            const isNearPageEnd = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - this.scrollOffset);
            if (isNearPageEnd) {
                this.isLoading = true;
                this.callback();
            }
        });
    }
    unlock() {
        this.isLoading = false;
    }
    lock() {
        this.isLoading = true;
    }
}
