import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { UserRepositoryImpl } from '../repository/user-repository-impl';
import { CacheService } from '../../cache/cache.service';
import { BcryptServiceImpl } from '../hash/Bcrypt.service';
import { KafkaProducer } from '../../kafka/producer/kafka.producer';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepositoryImpl,
    private cacheManager: CacheService,
    private bcrypt: BcryptServiceImpl,
    private kafkaProducer: KafkaProducer,
  ) {}
  async execute(user: UserEntity): Promise<UserEntity> {
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists) {
      throw new HttpException('Email or password invalid', HttpStatus.CONFLICT);
    }

    user.password = await this.bcrypt.generate(user.password);
    const userCreated = await this.userRepository.create(user);
    await this.kafkaProducer.sendMessage('my-kafka-consumer', {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      createAt: userCreated.createAt,
      updateAt: userCreated.updateAt,
      action: 'create',
    });

    await this.cacheManager.deleteCache('user_list');

    await this.cacheManager.setCache(`user:${userCreated.id}`, userCreated);

    return userCreated;
  }
}
