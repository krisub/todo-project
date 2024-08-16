import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ETagHeaderMiddleware } from '../etag-header.middleware';
import { ItemsController } from '../controllers/items.controller';
import { ItemsService } from '../services/items.service';
// import { MySqlDriver } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
  ],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ETagHeaderMiddleware)
      .forRoutes('*');
  }
}
