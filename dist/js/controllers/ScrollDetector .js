var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ScrollDetector {
    constructor(callback, scrollOffset = 100) {
        this.isLoading = false;
        this.callback = callback;
        this.scrollOffset = scrollOffset;
    }
    start() {
        window.addEventListener('scroll', () => __awaiter(this, void 0, void 0, function* () {
            if (this.isLoading)
                return;
            const isNearEnd = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - this.scrollOffset);
            if (isNearEnd) {
                this.isLoading = true;
                yield this.callback();
                this.isLoading = false;
            }
        }));
    }
    lock() {
        this.isLoading = true;
    }
    unlock() {
        this.isLoading = false;
    }
}
