import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { Item } from '../entities/items.entity';
import { GenericService } from './generic.service';

@Injectable()
export class ItemsService extends GenericService<Item, 'id'> {
  private idCounter: number = 0;

  constructor(
    em: EntityManager,
  ) {
    super(em.getRepository(Item));
  }

  async getAllItems(): Promise<Item[]> {
    return this.getAll();
  }

  async getItem(id: number): Promise<Item | null> {
    return this.getOne(id);
  }

  async createItem(description: string): Promise<Item> {
    return this.create({ description, done: false, id: this.idCounter++ });
  }

  async updateItem(id: number, description: string, done: boolean): Promise<Item | null> {
    const item = await this.getOne(id);
    if (item) {
      item.description = description;
      item.done = done;
      await this.entityManager.persistAndFlush(item);
    }
    return item;
  }

  async deleteItem(id: number): Promise<Item | null> {
    return this.delete(id);
  }

  async clearItems(): Promise<void> {
    this.idCounter = 0;
    return this.clear();
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
