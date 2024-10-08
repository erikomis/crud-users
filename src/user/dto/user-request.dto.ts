import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserRequestDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@email.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'The password must have at least 6 characters',
  })
  @MaxLength(20, {
    message: 'The password must have a maximum of 20 characters',
  })
  password: string;
}
