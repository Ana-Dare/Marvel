class MemoryCache {
    constructor() {
        this.cache = new Map();
    }
    set(key, value) {
        this.cache.set(key, value);
        console.log(`[CacheService] Item set for key ${key}`);
    }
    get(key) {
        if (this.cache.has(key)) {
            console.log(`[CacheService] Cache HIT for key: ${key}`);
            return this.cache.get(key);
        }
        return undefined;
    }
    has(key) {
        return this.cache.has(key);
    }
    delete(key) {
        this.cache.delete(key);
        console.log(`[CacheService] Item deleted for key: ${key}`);
    }
    clear() {
        this.cache.clear();
        console.log(`[CacheService] Cache cleared`);
    }
}
export const cacheService = new MemoryCache();
