import { Injectable } from '@angular/core';
import { Item } from "./item";

@Injectable({
  providedIn: 'root'
})
export class ItemService{

  allItems: Item[] = [];
  filter: "all" | "active" | "done" = "all";
  private apiUrl = "http://localhost:3000/items";


  async getItems() : Promise<Item[]> {
    const items = await fetch(this.apiUrl);
    this.allItems = await items.json() ?? [];
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

  async addItem(description: string) { 
    if (!description) return;
    const id = await this.getCurrentId();
    const item = { description, done: false, id };
    await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.allItems.unshift(item);
  }

  async getCurrentId(): Promise<number> { 
    const id = await fetch(this.apiUrl+"/currentId", { method: "GET"});
    return await id.json();
  }
  
  async remove(item: Item) {
    await fetch(this.apiUrl+"/"+item.id, {
      method: "POST",
    });
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }

  async updateItem(item: Item, description: string, done: boolean) {
    item.description = description;
    item.done = done;
    await fetch(this.apiUrl+"/"+item.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  }

  async clearItems(): Promise<Item[]> {
    const newItems = await fetch(this.apiUrl+"/clear", {
      method: "DELETE",
    });
    return [];
  }
  
}
