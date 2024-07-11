import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ItemsModule } from '../modules/items.module';
import { ItemsController } from '../controllers/items.controller';
import { ItemsService } from '../services/items.service';

@Module({
  imports: [ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
