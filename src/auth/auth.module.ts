import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

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
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
