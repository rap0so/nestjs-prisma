import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JWTStrategy } from 'src/auth/jwt.strategy';

const secret = process.env.JWT_SECRET!;
if (!secret) {
  throw new Error('process.env.JWT_SECRET undefined');
}

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '10m' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
})
export class AuthModule {}
