import { Body, Controller, Post } from '@nestjs/common';
import { UserRequestDto } from './dto/user-request.dto';
import { UserMapper } from './mapper/user.mapper';

@Controller('api/v1/users')
export class UserController {
  constructor() {}

  @Post('/create')
  async create(@Body() user: UserRequestDto) {
    const userEntity = UserMapper.toEntity(user);
    return userEntity;
  }
}
