class MemoryCache {
    constructor() {
        this.cache = new Map();
    }
    set(key, value) {
        this.cache.set(key, value);
    }
    get(key) {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        return undefined;
    }
}
export const cacheService = new MemoryCache();
