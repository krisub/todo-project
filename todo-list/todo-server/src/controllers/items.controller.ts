import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateItemDto } from '../item-dtos/create-item.dto';
import { UpdateItemDto } from '../item-dtos/update-item.dto';
import { ItemsService } from '../services/items.service';
import { Item } from '../entities/items.entity';

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

    @Put(':id')
    updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Item {
        return this.itemsService.updateItem(updateItemDto);
    }

    @Get(':id')
    getItem(@Param('id') id: string): Item {
        return this.itemsService.getItem(+id);
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
