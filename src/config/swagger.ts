import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const setupSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Prisma Api')
    .setDescription('First Nestjs API with Prisma')
    .setVersion('1.0.0')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

  return SwaggerModule.setup('api', app, swaggerDoc);
};

export default setupSwagger;
