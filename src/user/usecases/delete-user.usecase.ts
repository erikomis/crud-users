import { Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '../repository/user-repository-impl';
import { CacheService } from '../../cache/cache.service';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private userRepository: UserRepositoryImpl,
    private cacheManager: CacheService,
  ) {}
  private readonly userListCacheKey = 'user_list';
  async execute(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.delete(id);
    await this.cacheManager.deleteCache(`user:${id}`);
    await this.cacheManager.deleteCache(this.userListCacheKey);
  }
}
