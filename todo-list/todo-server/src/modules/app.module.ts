import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { ItemsModule } from './items/items.module';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './services/items.service';

@Module({
  imports: [ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
