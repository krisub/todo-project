import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.entity';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }
    
    @Get()
    getAllItems(): Item[] {
        return this.itemsService.getAllItems();
    }

    @Post()
    createItem(@Body() item_json : string): Item {
        return this.itemsService.createItem(item_json["description"]);
    }

    @Post(':id')
    deleteItem(@Param('id') id: string): Item {
        return this.itemsService.deleteItem(+id);
    }

    @Put(':id')
    updateItem(@Param('id') id: string, @Body() item_json: string): Item {
        return this.itemsService.updateItem(item_json["description"], item_json["done"], +id);
    }
    
    @Delete('clear')
    clearItems(): void {
        this.itemsService.clearItems();
    }

    @Get('currentId')
    getCurrentId(): number {
        return this.itemsService.getCurrentId();
    }

}
