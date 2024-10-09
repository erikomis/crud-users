import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '../repository/user-repository-impl';
import { CacheService } from '../../cache/cache.service';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class GetByIdUserUseCase {
  constructor(
    private userRepository: UserRepositoryImpl,
    private cacheManager: CacheService,
  ) {}

  async execute(id: number): Promise<UserEntity> {
    const cachedUser = await this.cacheManager.getCacheByKey<UserEntity>(
      `user:${id}`,
    );

    if (cachedUser) {
      return cachedUser;
    }
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.cacheManager.setCache(`user:${id}`, user);

    return user;
  }
}
