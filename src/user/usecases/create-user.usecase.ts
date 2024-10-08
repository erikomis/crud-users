import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { UserRepositoryImpl } from '../repository/user-repository-impl';
import { CacheService } from '../../cache/cache.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepositoryImpl,
    private cacheManager: CacheService,
  ) {}
  async execute(user: UserEntity): Promise<UserEntity> {
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists) {
      throw new HttpException('Email or password invalid', HttpStatus.CONFLICT);
    }
    const userCreated = await this.userRepository.create(user);

    await this.cacheManager.getCache(`user:${userCreated.id}`, async () => {
      return userCreated;
    });

    return userCreated;
  }
}
