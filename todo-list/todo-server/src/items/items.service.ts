import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Injectable } from '@nestjs/common';
import { Item } from './items.entity';

@Injectable()
export class ItemsService {
    private items: Item[] = [];
    private idCounter: number = 0;

    getAllItems(): Item[] {
        return this.items.slice().reverse();
    }
   
    // with createitemdto
    createItem(createItemDto: CreateItemDto): Item {
        const item: Item = { description: createItemDto.description, done: false, id: this.idCounter };
        this.idCounter++;
        this.items.push(item);
        return item;
    }

    // createItem(description: string): Item {
    //     const item: Item = { description: description, done: false, id: this.idCounter };
    //     this.idCounter++;
    //     this.items.push(item);
    //     return item;
    // }

    // with updateitemdto
    updateItem(updateItemDto: UpdateItemDto): Item {
        const item = this.items.find(i => i.id === updateItemDto.id);
        item.description = updateItemDto.description;
        item.done = updateItemDto.done;
        return item;
    }

    // updateItem(description: string, done: boolean, id: number): Item {
    //     const item = this.items.find(i => i.id === id);
    //     item.description = description;
    //     item.done = done;
    //     return item;
    // }

    deleteItem(id: number): Item {
        const item = this.items.find(i => i.id === id);
        if (item === undefined) {
            return
        }
        this.items = this.items.filter(i => i.id !== id);
        return item;
    }

    clearItems(): void {
        this.items = [];
        this.idCounter = 0;
    }

    getCurrentId(): number {
        return this.idCounter;
    }

}
