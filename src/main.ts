import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setupSwagger from 'src/config/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
