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
    getAllItems(): Item[] {
        return this.itemsService.getAllItems();
    }

    @Post()
    createItem(@Body() createItemDto : CreateItemDto): Item {
        return this.itemsService.createItem(createItemDto);
    }

    // @Put(':id')
    // updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Item {
    //     return this.itemsService.updateItem(updateItemDto);
    // }
    @Put(':id')
    updateItem(
        @Param('id') id: string, 
        @Body() updateItemDto: UpdateItemDto, 
        @Headers('if-match') ifMatch: string, 
        @Res() res: Response
    ): void {
        const existingItem = this.itemsService.getItem(+id);

        if (!existingItem) {
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        }

        const currentEtag = etag(JSON.stringify(existingItem));
        
        if (ifMatch !== currentEtag) {
            throw new HttpException('ETag mismatch', HttpStatus.PRECONDITION_FAILED);
        }

        const updatedItem = this.itemsService.updateItem(updateItemDto);
        const newEtag = etag(JSON.stringify(updatedItem));
        res.setHeader('ETag', newEtag);
        res.send(updatedItem);
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
