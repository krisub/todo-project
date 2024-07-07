import { Component, Input, Output, EventEmitter, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemService } from "./item.service";
import { Item } from "./item";


@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

  editable = false;

  @Input() item!: Item;
  @Output() remove = new EventEmitter<Item>();
  itemService: ItemService = inject(ItemService);

  saveItem(description: string) {
    if (!description) return;
    this.editable = false;
    this.item.description = description;
    this.itemService.updateItem(this.item, description, this.item.done);
  }

  changeDone() {
    this.itemService.updateItem(this.item, this.item.description, !this.item.done);
  }

}

