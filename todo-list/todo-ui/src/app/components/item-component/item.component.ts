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

  itemForm: FormGroup = new FormGroup({
    description: new FormControl(''),
    done: new FormControl(false)
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && this.item) {
      this.initializeForm(this.item.description);
    }
    
    this.itemForm.get('description')?.valueChanges.subscribe(desc => {
        this.item.description = desc;
    });

    this.itemForm.get('done')?.valueChanges.subscribe(done => {
      this.item.done = done;
    });
  }

  initializeForm(desc: string) {
    this.itemForm.patchValue({
      description: desc,
      done: this.item.done
    });
  }

  async onSubmit() {
    const updateItemDto = {
      id: this.item.id,
      version: this.item.version,
      description: this.item.description,
      done: this.item.done
    };
    await this.itemService.updateItem(updateItemDto);
  }

  async cancel() {
    const itemDescription = await this.itemService
      .getItem(this.item)
      .then((item) => item.description);
    this.initializeForm(itemDescription);
  }

}

