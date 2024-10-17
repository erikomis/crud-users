import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '../repository/user-repository-impl';
import { CacheService } from '../../cache/cache.service';
import { UserEntity } from '../entity/user.entity';
import { KafkaProducer } from '../../kafka/producer/kafka.producer';
import { BcryptServiceImpl } from '../hash/Bcrypt.service';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private userRepository: UserRepositoryImpl,
    private cacheManager: CacheService,
    private kafkaProducer: KafkaProducer,
    private bcrypt: BcryptServiceImpl,
  ) {}
  private readonly userListCacheKey = 'user_list';
  async execute(id: number, user: UserEntity): Promise<UserEntity> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const existsEmail = await this.userRepository.findByEmail(user.email);
    if (existsEmail) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    user.id = Number(id);
    user.password = await this.bcrypt.generate(user.password);

    const userUpdate = await this.userRepository.update(user);
    await this.kafkaProducer.sendMessage('my-kafka-consumer', {
      id: userUpdate.id,
      name: userUpdate.name,
      email: userUpdate.email,
      createAt: userUpdate.createAt,
      updateAt: userUpdate.updateAt,
      action: 'update',
    });

    await this.cacheManager.deleteCache(`user:${id}`);

    await this.cacheManager.deleteCache(this.userListCacheKey);

    return userUpdate;
  }
}
