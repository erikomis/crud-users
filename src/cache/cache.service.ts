import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  async getCache<T>(
    key: string,

    functionRequest: () => Promise<T>,
  ) {
    const allData: T = await this.cacheManager.get(key);
    console.log('allData', allData);

    if (!allData || (Array.isArray(allData) && allData.length === 0)) {
      const data = await functionRequest();

      await this.cacheManager.set(key, data);
      return data;
    }

    return allData;
  }

  async setCache(key: string, value: any): Promise<void> {
    try {
      await this.cacheManager.set(key, value);
    } catch (error) {
      throw new Error(`Cache set error: ${error.message}`);
    }
  }

  async deleteCache(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
    } catch (error) {
      throw new Error(`Cache delete error: ${error.message}`);
    }
  }

  async getCacheByKey<T>(key: string): Promise<T> {
    return await this.cacheManager.get(key);
  }
}
