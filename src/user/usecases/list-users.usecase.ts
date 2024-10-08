import { Injectable } from '@nestjs/common';

import { UserEntity } from '../entity/user.entity';
import { UserRepositoryImpl } from '../repository/user-repository-impl';

import { CacheService } from '../../cache/cache.service';

@Injectable()
export class ListUsersUseCase {
  constructor(
    private userRepository: UserRepositoryImpl,
    private cacheManager: CacheService,
  ) {}
  private readonly userListCacheKey = 'user_list';
  async execute(): Promise<UserEntity[]> {
    const users = await this.cacheManager.getCache<UserEntity[]>(
      this.userListCacheKey,
      async () => await this.userRepository.findAll(),
    );
    return users;
  }
}
