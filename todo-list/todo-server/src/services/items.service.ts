import { Injectable, Inject } from '@nestjs/common';
import { MikroORM, EntityManager } from '@mikro-orm/core';
import { Item } from '../entities/items.entity';

@Injectable()
export class ItemsService {
  private em: EntityManager;

  constructor(
    @Inject('MikroORM') private readonly orm: MikroORM,
  ) {
    this.em = orm.em;
  }

  async getAllItems(): Promise<Item[]> {
    return this.em.find(Item, {});
  }

  async getItem(id: number): Promise<Item | null> {
    return this.em.findOne(Item, id);
  }

  async createItem(description: string): Promise<Item> {
    const item = this.em.create(Item, { description });
    await this.em.persistAndFlush(item);
    return item;
  }

  async updateItem(id: number, description: string): Promise<Item | null> {
    const item = await this.em.findOne(Item, id);
    if (item) {
      item.description = description;
      await this.em.persistAndFlush(item);
    }
    return item;
  }

  async deleteItem(id: number): Promise<Item | null> {
    const item = await this.em.findOne(Item, id);
    if (item) {
      await this.em.removeAndFlush(item);
    }
    return item;
  }

  async clearItems(): Promise<void> {
    await this.em.nativeDelete(Item, {});
  }
}


// import { CreateItemDto } from '../item-dtos/create-item.dto';
// import { UpdateItemDto } from '../item-dtos/update-item.dto';
// import { Injectable } from '@nestjs/common';
// import { Item } from '../entities/items.entity';

// @Injectable()
// export class ItemsService {
//     private items: Item[] = [];
//     private idCounter: number = 0;

//     getAllItems(): Item[] {
//         return this.items.slice().reverse();
//     }
   
//     createItem(createItemDto: CreateItemDto): Item {
//         const item: Item = {
//             description: createItemDto.description,
//             done: false, id: this.idCounter
//         };
//         this.idCounter++;
//         this.items.push(item);
//         return item;
//     }

//     updateItem(updateItemDto: UpdateItemDto): Item {
//         const item = this.items.find(i => i.id === updateItemDto.id);

//         if (item === undefined) {
//             return null;
//         }

//         item.description = updateItemDto.description;
//         item.done = updateItemDto.done;

//         return item;
//     }

//     getItem(id: number): Item {
//         return this.items.find(i => i.id === id);
//     }

//     deleteItem(id: number): Item {
//         const item = this.items.find(i => i.id === id);
        
//         if (item === undefined) {
//             return null;
//         }

//         this.items = this.items.filter(i => i.id !== id);
//         return item;
//     }

//     clearItems(): void {
//         this.items = [];
//         this.idCounter = 0;
//     }


//     // getCurrentId(): number {
//     //     return this.idCounter;
//     // }

// }
