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
}

export const cacheService = new MemoryCache();
