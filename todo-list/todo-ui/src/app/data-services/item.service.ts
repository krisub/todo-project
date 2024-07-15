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

  // private updateEtags(headers: any) {
  //   this.allItems.forEach(item => {
  //     const etag = headers['etag-' + item.id];
  //     if (etag) {
  //       this.etagMap.set(item.id, etag);
  //     }
  //   });
  // }

  private updateEtagsForItem(headers: any, itemId: number) {
    const etag = headers['etag-' + itemId];
    console.log('etag:    ', etag);
    if (etag) {
      this.etagMap.set(itemId, etag);
    }
  }

  async getItems(): Promise<Item[]> {
    const response = await this.apiService.get("");
    this.allItems = response.body;
    // call get item for each item in all items
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
    this.getItems();
  }

  async getItem(item: Item) {
    const response = await this.apiService.get("/" + item.id);
    // console.log(response.headers.get('etag'));
    // this.updateEtagsForItem(response.headers, item.id);
    return response.body;
  }
  
  async remove(item: Item) {
    await this.apiService.post("/"+item.id, null);
    this.allItems.splice(this.allItems.indexOf(item), 1);
    this.etagMap.delete(item.id);
  }

  async updateItem(updateItemDto: any) {
    const etag = this.etagMap.get(updateItemDto.id);
    console.log('frontend etag:    ', etag);
    if (etag) {
      await this.apiService.put("/" + updateItemDto.id, updateItemDto, {
        headers: { 'If-Match': etag }
      });
    } else {
      await this.apiService.put("/" + updateItemDto.id, updateItemDto);
    }
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
