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

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CacheModuleProject],
  controllers: [UserController],
  providers: [
    UserRepositoryImpl,
    CreateUserUseCase,
    ListUsersUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    GetByIdUserUseCase,
  ],
})
export class UserModule {}
