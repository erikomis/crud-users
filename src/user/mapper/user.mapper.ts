import { UserRequestDto } from '../dto/user-request.dto';
import { UserEntity } from '../entity/user.entity';

export class UserMapper {
  static toEntity(user: UserRequestDto): UserEntity {
    const entity = new UserEntity();
    entity.name = user.name;
    entity.email = user.email;
    entity.password = user.password;
    return entity;
  }
}
