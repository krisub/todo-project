import { NestFactory } from '@nestjs/core';
//import { AppModule } from './app.module';
import { ItemsModule } from './entities/items.module';

async function bootstrap() {
  const app = await NestFactory.create(ItemsModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
