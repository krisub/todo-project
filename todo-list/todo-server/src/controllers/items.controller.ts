import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, Res, Headers } from '@nestjs/common';
import { CreateItemDto } from '../item-dtos/create-item.dto';
import { UpdateItemDto } from '../item-dtos/update-item.dto';
import { ItemsService } from '../services/items.service';
import { Item } from '../entities/items.entity';
import * as etag from 'etag';
import { Response } from 'express';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }
    
    @Get()
    getAllItems(@Res() res: Response): void {
        const items = this.itemsService.getAllItems();
        res.setHeader('ETag', etag(JSON.stringify(items)));
        res.send(items);
    }

    @Post()
    createItem(@Body() createItemDto: CreateItemDto, @Res() res: Response): void {
        const item = this.itemsService.createItem(createItemDto);
        res.set('ETag', etag(JSON.stringify(item)));
        res.json(item);
    }

    // @Put(':id')
    // updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Item {
    //     return this.itemsService.updateItem(updateItemDto);
    // }
    @Put(':id')
    updateItem(@Param('id') id: string,
        @Body() updateItemDto: UpdateItemDto,
        @Headers('If-Match') ifMatch: string,
        @Res() res: Response): void {
        
        const item = this.itemsService.getItem(+id);
        if (!item) {
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        }

        const currentEtag = etag(JSON.stringify(item));
        if (ifMatch !== currentEtag) {
            throw new HttpException('ETag mismatch', HttpStatus.PRECONDITION_FAILED);
        }

        const updatedItem = this.itemsService.updateItem(updateItemDto);
        res.set('ETag', etag(JSON.stringify(updatedItem)));
        res.json(updatedItem);
    }

    // @Get(':id')
    // getItem(@Param('id') id: string): Item {
    //     return this.itemsService.getItem(+id);
    // }
    @Get(':id')
    getItem(@Param('id') id: string, @Res() res: Response): void {
        const item = this.itemsService.getItem(+id);

        if (!item) {
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        }

        const etagValue = etag(JSON.stringify(item));
        console.log('backend etag in get:   ', etagValue);
        res.setHeader('ETag', etagValue);
        res.send(item);
    }

    @Post(':id')
    deleteItem(@Param('id') id: string): Item {
        return this.itemsService.deleteItem(+id);
    }
    
    @Delete('clear')
    clearItems(): void {
        this.itemsService.clearItems();
    }

    // @Get('currentId')
    // getCurrentId(): number {
    //     return this.itemsService.getCurrentId();
    // }

}
