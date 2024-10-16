import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepositoryImpl } from './repository/user-repository-impl';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { ListUsersUseCase } from './usecases/list-users.usecase';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { CacheModuleProject } from '../cache/cache.module';
import { GetByIdUserUseCase } from './usecases/get-by-id-user.usecase';
import { BcryptServiceImpl } from './hash/Bcrypt.service';
import { KafkaModule } from '../kafka/kafka.module';
import { UpdateUserUseCase } from './usecases/update-user.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CacheModuleProject,
    KafkaModule,
  ],
  controllers: [UserController],
  providers: [
    UserRepositoryImpl,
    CreateUserUseCase,
    UpdateUserUseCase,
    ListUsersUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    GetByIdUserUseCase,
    BcryptServiceImpl,
  ],
})
export class UserModule {}
