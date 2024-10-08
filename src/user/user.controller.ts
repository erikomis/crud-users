import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRequestDto } from './dto/user-request.dto';
import { UserMapper } from './mapper/user.mapper';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { ListUsersUseCase } from './usecases/list-users.usecase';
import { GetByIdUserUseCase } from './usecases/get-by-id-user.usecase';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';

@Controller('api/v1/users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private listUsersUseCase: ListUsersUseCase,
    private getUserUseCase: GetByIdUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create user' })
  @ApiConflictResponse({ status: 409, description: 'User already exists' })
  @ApiOkResponse({
    status: 201,
    description: 'User created',
    type: UserResponseDto,
  })
  async create(@Body() user: UserRequestDto) {
    const userEntity = UserMapper.toEntity(user);
    const userService = await this.createUserUseCase.execute(userEntity);
    return UserMapper.toDto(userService);
  }

  @Get('/list')
  @ApiOperation({ summary: 'List users' })
  @ApiOkResponse({
    status: 200,
    description: 'Return all users',
    type: UserResponseDto,
    isArray: true,
  })
  async list() {
    const users = await this.listUsersUseCase.execute();
    return users.map((user) => UserMapper.toDto(user));
  }

  @Get('/user/:id')
  @ApiOperation({ summary: 'Get user' })
  @ApiOkResponse({
    status: 200,
    description: 'Return user',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ status: 400, description: 'User not found' })
  async get(@Param('id') id: number) {
    const user = await this.getUserUseCase.execute(id);
    return UserMapper.toDto(user);
  }

  @Delete('/user/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiNoContentResponse({ status: 204, description: 'Delete user' })
  @ApiBadRequestResponse({ status: 400, description: 'User not found' })
  async delete(@Param('id') id: number) {
    await this.deleteUserUseCase.execute(id);
  }

  @Put('/user/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({
    status: 200,
    description: 'User updated',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ status: 400, description: 'User not found' })
  async update(@Param('id') id: number, @Body() user: UserRequestDto) {
    const userEntity = UserMapper.toEntity(user);
    const userService = await this.createUserUseCase.execute(userEntity);
    return UserMapper.toDto(userService);
  }
}
