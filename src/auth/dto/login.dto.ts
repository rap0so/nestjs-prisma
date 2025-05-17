import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class Login {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
