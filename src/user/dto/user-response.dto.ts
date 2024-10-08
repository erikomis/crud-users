import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    type: 'number',
    description: 'The id of the user',
    example: 1,
  })
  id: number;
  @ApiProperty({
    type: 'string',
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;
  @ApiProperty({
    type: 'string',
    description: 'The email of the user',
    example: 'teste@email.com',
  })
  email: string;
  @ApiProperty({
    type: 'date',
    description: 'The date of the user was created',
    example: '2021-08-31T03:00:00.000Z',
  })
  createAt: Date;
  @ApiProperty({
    type: 'date',
    description: 'The date of the user was updated',
    example: '2021-08-31T03:00:00.000Z',
  })
  updateAt: Date;
}
