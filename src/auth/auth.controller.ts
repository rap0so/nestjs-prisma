import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/entity/auth.entity';
import { Login } from 'src/auth/dto/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: Auth })
  login(@Body() { email, password }: Login) {
    return this.authService.login(email, password);
  }
}
