import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { UserRepositoryImpl } from '../repository/user-repository-impl';
import { CacheService } from '../../cache/cache.service';
import { BcriptServiceImpl } from '../hash/Bcript.service';
import { KafkaProducer } from '../../kafka/producer/kafka.producer';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepositoryImpl,
    private cacheManager: CacheService,
    private bcript: BcriptServiceImpl,
    private kafkaProducer: KafkaProducer,
  ) {}
  async execute(user: UserEntity): Promise<UserEntity> {
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists) {
      throw new HttpException('Email or password invalid', HttpStatus.CONFLICT);
    }

    user.password = await this.bcript.generate(user.password);
    const userCreated = await this.userRepository.create(user);
    await this.kafkaProducer.sendMessage('my-kafka-consumer', {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      createAt: userCreated.createAt,
      updateAt: userCreated.updateAt,
      action: 'create',
    });
    await this.cacheManager.getCacheByKey<UserEntity>(`user:${userCreated.id}`);

    return userCreated;
  }
}
