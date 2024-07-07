import { Injectable } from '@nestjs/common';
import { Item } from './items.entity';

@Injectable()
export class ItemsService {
    private items: Item[] = [];
    private idCounter: number = 0;

    getAllItems(): Item[] {
        return this.items.slice().reverse();
    }

    createItem(description: string): Item {
        const item: Item = { description: description, done: false, id: this.idCounter };
        this.idCounter++;
        this.items.push(item);
        return item;
    }

    deleteItem(id: number): Item {
        // this.items = this.items.filter(i => i !== item);
        const item = this.items.find(i => i.id === id);
        if (item === undefined) {
            console.log("Item not found")
            return
        }
        this.items = this.items.filter(i => i.id !== id);
        return item;
    }

    updateItem(description: string, done: boolean, id: number): Item {
        // find item from id
        const item = this.items.find(i => i.id === id);
        item.description = description;
        item.done = done;
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
