import { Injectable, inject } from '@angular/core';
import { APIService } from './api.service';
import { Item } from "../item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  allItems: Item[] = [];
  filter: "all" | "active" | "done" = "all";
  apiService: APIService = inject(APIService);

  async getItems(): Promise<Item[]> {
    const response = await this.apiService.get("");
    this.allItems = response.body;
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
    const response = await this.apiService.post("", createItemDto);
    await this.getItem(response.body);
    await this.getItems();
  }

  async getItem(item: Item) {
    const response = await this.apiService.get("/" + item.id);
    return response.body;
  }

  async remove(item: Item) {
    await this.apiService.post("/" + item.id, null);
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }

  async updateItem(updateItemDto: any) {
    await this.apiService.put("/" + updateItemDto.id, updateItemDto);
    await this.getItem(updateItemDto);
    await this.getItems();
  }

  async clearItems(): Promise<Item[]> {
    await this.apiService.delete("/clear");
    this.allItems = [];
    return this.allItems;
  }
}
