import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Item } from '../entities/items.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
