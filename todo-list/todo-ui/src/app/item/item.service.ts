import { Injectable, inject } from '@angular/core';
import { APIService } from './api.service';
import { Item } from "./item";

@Injectable({
  providedIn: 'root'
})
export class ItemService{

  allItems: Item[] = [];
  filter: "all" | "active" | "done" = "all";
  apiService: APIService = inject(APIService);


  async getItems() : Promise<Item[]> {
    this.allItems = await this.apiService.get("");
    return this.allItems;
  }
  
  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.filter === "done" ? item.done : !item.done
    );
  }

  async addItem(createItemDto: any) {
    if (!createItemDto.description) return;
    await this.apiService.post("", createItemDto);
    this.getItems();
  }

  async getCurrentId(): Promise<number> { 
    const id = await this.apiService.get("/currentId");
    return await id.json();
  }
  
  async remove(item: Item) {
    await this.apiService.post("/"+item.id, null);
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }

  async updateItem(updateItemDto: any) {
    await this.apiService.put("/"+updateItemDto.id, updateItemDto);
  }

  async clearItems(): Promise<Item[]> {
    return [];
  }

}
