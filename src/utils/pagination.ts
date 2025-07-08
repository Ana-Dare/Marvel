export class PaginationController {
  constructor(private limit: number) {}

  calculateNextOffset(currentOffset: number): number {
    return currentOffset + this.limit;
  }

  hasReachedEnd(currentOffset: number, total: number): boolean {
    return currentOffset >= total;
  }

  getLimit(): number {
    return this.limit;
  }
}
