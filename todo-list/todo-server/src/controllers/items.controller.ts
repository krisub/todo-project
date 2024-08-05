import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, Res, Headers } from '@nestjs/common';
import { CreateItemDto } from '../item-dtos/create-item.dto';
import { UpdateItemDto } from '../item-dtos/update-item.dto';
import { ItemsService } from '../services/items.service';
import { Item } from '../entities/items.entity';
import * as etag from 'etag';
import { Response } from 'express';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getAllItems(@Res() res: Response): Promise<void> {
    const items = await this.itemsService.getAllItems();
    res.setHeader('ETag', etag(JSON.stringify(items)));
    res.send(items);
  }

  @Post()
  async createItem(@Body() createItemDto: CreateItemDto, @Res() res: Response): Promise<void> {
    const item = await this.itemsService.createItem(createItemDto.description);
    res.set('ETag', etag(JSON.stringify(item)));
    res.json(item);
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @Headers('If-Match') ifMatch: string,
    @Res() res: Response
  ): Promise<void> {
    const item = await this.itemsService.getItem(+id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    const currentEtag = etag(JSON.stringify(item));
    if (ifMatch !== currentEtag) {
      throw new HttpException('ETag mismatch', HttpStatus.PRECONDITION_FAILED);
    }

    const updatedItem = await this.itemsService.updateItem(+id, updateItemDto.description);
    res.set('ETag', etag(JSON.stringify(updatedItem)));
    res.json(updatedItem);
  }

  @Get(':id')
  async getItem(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const item = await this.itemsService.getItem(+id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    const etagValue = etag(JSON.stringify(item));
    res.setHeader('ETag', etagValue);
    res.send(item);
  }

  @Post(':id')
  async deleteItem(@Param('id') id: string): Promise<Item | null> {
    return this.itemsService.deleteItem(+id);
  }

  @Delete('clear')
  async clearItems(): Promise<void> {
    await this.itemsService.clearItems();
  }
}
