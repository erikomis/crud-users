import { UserRequestDto } from '../dto/user-request.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserEntity } from '../entity/user.entity';

export class UserMapper {
  static toEntity(user: UserRequestDto): UserEntity {
    const entity = new UserEntity();
    entity.name = user.name;
    entity.email = user.email;
    entity.password = user.password;
    return entity;
  }
  static toDto(user: UserEntity): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    dto.createAt = user.createAt;
    dto.updateAt = user.updateAt;
    return dto;
  }
}
