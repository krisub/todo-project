import { CreateItemDto } from '../item-dtos/create-item.dto';
import { UpdateItemDto } from '../item-dtos/update-item.dto';
import { Injectable } from '@nestjs/common';
import { Item } from '../entities/items.entity';

@Injectable()
export class ItemsService {
    private items: Item[] = [];
    private idCounter: number = 0;

    getAllItems(): Item[] {
        return this.items.slice().reverse();
    }
   
    createItem(createItemDto: CreateItemDto): Item {
        const item: Item = {
            description: createItemDto.description,
            done: false, id: this.idCounter, version: 0
        };
        this.idCounter++;
        this.items.push(item);
        return item;
    }

    updateItem(updateItemDto: UpdateItemDto): Item {
        const item = this.items.find(i => i.id === updateItemDto.id);

        if (item.version == updateItemDto.version) {
            item.description = updateItemDto.description;
            item.done = updateItemDto.done;
            item.version++;
        }
        
        updateItemDto.version = item.version;

        return item;
    }

    getItem(id: number): Item {
        return this.items.find(i => i.id === id);
    }

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


    // getCurrentId(): number {
    //     return this.idCounter;
    // }

}
