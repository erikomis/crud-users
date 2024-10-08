import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

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
