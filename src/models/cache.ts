class MemoryCache {
  private cache = new Map<string, any>();

  public set(key: string, value: any) {
    this.cache.set(key, value);
  }

  public get(key: string): any | undefined {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    return undefined;
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public delete(key: string): void {
    this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const cacheService = new MemoryCache();
