export class PaginationController {
    constructor(limit) {
        this.limit = limit;
    }
    calculateNextOffset(currentOffset) {
        return currentOffset + this.limit;
    }
    hasReachedEnd(currentOffset, total) {
        return currentOffset >= total;
    }
    getLimit() {
        return this.limit;
    }
}
