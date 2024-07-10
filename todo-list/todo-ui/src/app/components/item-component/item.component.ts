import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemService } from "../../data-services/item.service";
import { Item } from "../../item";
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

  editable = false;

  @Input() item!: Item;
  @Output() remove = new EventEmitter<Item>();
  itemService: ItemService = inject(ItemService);
  originalDescription = '';

  itemForm: FormGroup = new FormGroup({
    description: new FormControl(''),
    done: new FormControl(false)
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && this.item) {
      this.originalDescription = this.item.description;
      this.initializeForm(this.item.description, this.item.done);
    }
  }

  initializeForm(desc: string, done: boolean) {
    this.itemForm.setValue({
      description: desc,
      done: done
    });

    this.itemForm.get('description')?.valueChanges.subscribe(desc => {
        this.item.description = desc;
    });

    this.itemForm.get('done')?.valueChanges.subscribe(done => {
      this.item.done = !this.item.done;
    });
  }

  async onSubmit() {
    this.editable = false;
    const updateItemDto = { id: this.item.id, description: this.item.description, done: this.item.done };
    await this.itemService.updateItem(updateItemDto);
  }

  cancel() {
    this.editable = false;
    this.initializeForm(this.originalDescription, this.item.done);
  }

}

