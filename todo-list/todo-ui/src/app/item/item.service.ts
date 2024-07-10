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
  // private apiUrl = "http://localhost:3000/items";


  async getItems() : Promise<Item[]> {
    // const items = await fetch(this.apiUrl);
    // this.allItems = await items.json() ?? [];
    // using api service
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
    //await this.fetchItem("", "POST", createItemDto);
    // using api service
    await this.apiService.post("", createItemDto);
    this.getItems();
  }

  async getCurrentId(): Promise<number> { 
    // const id = await fetch(this.apiUrl+"/currentId", { method: "GET"});
    const id = await this.apiService.get("/currentId");
    return await id.json();
  }
  
  async remove(item: Item) {
    // await fetch(this.apiUrl+"/"+item.id, {
    //   method: "POST",
    // });
    // using api service
    await this.apiService.post("/"+item.id, null);
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }

  async updateItem(updateItemDto: any) {
    // await this.fetchItem("/"+updateItemDto.id, "PUT", updateItemDto);
    // await fetch(this.apiUrl+"/"+updateItemDto.id, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updateItemDto),
    // });
    // using api service
    await this.apiService.put("/"+updateItemDto.id, updateItemDto);
  }

  async clearItems(): Promise<Item[]> {
    // const newItems = await fetch(this.apiUrl+"/clear", {
    //   method: "DELETE",
    // });
    // using api service
    //const newItems = await this.apiService.delete("/clear");
    return [];
  }

  // async fetchItem(url: string, method: string, dto : any) {
  //   await fetch(this.apiUrl+url, {
  //     method: method,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dto),
  //   });
  // }
  
}
