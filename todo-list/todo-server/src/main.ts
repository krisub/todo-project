import { MikroORM } from '@mikro-orm/mysql';
import { NestFactory } from '@nestjs/core';
import { ItemsModule } from './modules/items.module';
import mikroOrmConfig from './mikro-orm.config';

async function bootstrap() {
  // Initialize MikroORM
  const orm = await MikroORM.init(mikroOrmConfig);

  const app = await NestFactory.create(ItemsModule);

  app.use(async (req, res, next) => {
    req['orm'] = orm;
    next();
  });

  await app.listen(3000);
}

bootstrap();
