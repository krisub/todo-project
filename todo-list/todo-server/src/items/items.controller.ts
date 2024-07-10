import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
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
    createItem(@Body() createItemDto : CreateItemDto): Item {
        return this.itemsService.createItem(createItemDto);
    }

    @Put(':id')
    updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Item {
        return this.itemsService.updateItem(updateItemDto);
    }

    @Post(':id')
    deleteItem(@Param('id') id: string): Item {
        return this.itemsService.deleteItem(+id);
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
