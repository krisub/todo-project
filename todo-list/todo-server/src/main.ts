import { NestFactory } from '@nestjs/core';
import { ItemsModule } from './modules/items.module';

async function bootstrap() {
  const app = await NestFactory.create(ItemsModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}

bootstrap();
