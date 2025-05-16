import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User as UserClient } from '@prisma/client';
import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class User extends CreateUserDto implements UserClient {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @IsDate()
  @ApiProperty()
  createAt: Date;

  @IsDate()
  @ApiProperty()
  updatedAt: Date;
}
