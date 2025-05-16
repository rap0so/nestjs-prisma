import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'src/auth/entity/auth.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<Auth> {
    const user = await this.prisma.user.findUnique({ where: { login: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // TODO: hash passwords
    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
