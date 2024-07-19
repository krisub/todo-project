import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ETagHeaderMiddleware } from '../etag-header.middleware';
import { ItemsController } from '../controllers/items.controller';
import { ItemsService } from '../services/items.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ETagHeaderMiddleware)
      .forRoutes('*'); // apply to all routes
  }
}
