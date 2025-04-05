import { LRUCache } from 'lru-cache';
import { CacheAdapter } from './cacheAdapter';

export class LruCacheAdapter implements CacheAdapter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cache: LRUCache<string, any>;

  constructor(maxSize = 500, ttlMs = 1000 * 60 * 5) {
    this.cache = new LRUCache({
      max: maxSize,
      ttl: ttlMs,
    });
  }

  get<T>(key: string): T | undefined {
    return this.cache.get(key) as T | undefined;
  }

  set<T>(key: string, value: T, ttlMs?: number): void {
    this.cache.set(key, value, { ttl: ttlMs });
  }
}

export const lruCacheAdapterSingleton = new LruCacheAdapter();
