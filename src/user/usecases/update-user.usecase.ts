import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '../repository/user-repository-impl';
import { CacheService } from '../../cache/cache.service';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private userRepository: UserRepositoryImpl,
    private cacheManager: CacheService,
  ) {}
  private readonly userListCacheKey = 'user_list';
  async execute(id: number, user: UserEntity): Promise<UserEntity> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.id = id;

    const userUpdate = this.userRepository.update(user);

    await this.cacheManager.deleteCache(`user:${id}`);

    await this.cacheManager.deleteCache(this.userListCacheKey);

    return userUpdate;
  }
}
