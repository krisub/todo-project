import { Injectable, inject } from '@angular/core';
import { APIService } from './api.service';
import { Item } from "../item";

@Injectable({
  providedIn: 'root'
})
export class ItemService{

  allItems: Item[] = [];
  etags: any;
  filter: "all" | "active" | "done" = "all";
  apiService: APIService = inject(APIService);
  etagMap: Map<number, string> = new Map();

  private updateEtagsForItem(headers: any, itemId: number) {
    const etag = headers['etag'];
    if (etag) {
      this.etagMap.set(itemId, etag);
    }
  }

  async getItems(): Promise<Item[]> {
    const response = await this.apiService.get("");
    this.allItems = response.body;

    for (const item of this.allItems) {
      this.getItem(item);
    }

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
    await this.getItems();
  }

  async getItem(item: Item) {
    const response = await this.apiService.get("/" + item.id);
    this.updateEtagsForItem(response.headers, item.id);
      
    return response.body;
  }
  
  async remove(item: Item) {
    await this.apiService.post("/"+item.id, null);
    this.allItems.splice(this.allItems.indexOf(item), 1);
    this.etagMap.delete(item.id);
  }


  async updateItem(updateItemDto: any) {
    const etag = this.etagMap.get(updateItemDto.id);
    const customHeaders = etag ? { 'If-Match': etag } : {};
    await this.apiService.put("/" + updateItemDto.id, updateItemDto, customHeaders);
    await this.getItems();
  }

  async clearItems(): Promise<Item[]> {
    await this.apiService.delete("/clear");
    this.allItems = [];
    this.etagMap.clear();
    return this.allItems;
  }

  // async getCurrentId(): Promise<number> {
  //   const id = await this.apiService.get("/currentId");
  //   return await id.json();
  // }

}
