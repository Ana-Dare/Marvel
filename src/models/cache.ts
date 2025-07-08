class MemoryCache {
  private cache = new Map<string, any>();

  public set(key: string, value: any) {
    //definir
    this.cache.set(key, value);
    console.log(`[CacheService] Item set for key ${key}`);
  }

  public get(key: string): any | undefined {
    // pegar
    if (this.cache.has(key)) {
      console.log(`[CacheService] Cache HIT for key: ${key}`);
      return this.cache.get(key);
    }
    return undefined;
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public delete(key: string): void {
    this.cache.delete(key);
    console.log(`[CacheService] Item deleted for key: ${key}`);
  }

  public clear(): void {
    this.cache.clear();
    console.log(`[CacheService] Cache cleared`);
  }
}

export const cacheService = new MemoryCache();
