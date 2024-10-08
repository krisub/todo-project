import { Component, inject, OnInit, OnDestroy } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ItemComponent } from "../item-component/item.component";
import { ItemService } from "../../data-services/item.service";
import { Subscription } from "rxjs";
import { NavigationStart, Router } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, ItemComponent, ReactiveFormsModule],
})
export class AppComponent implements OnInit, OnDestroy {
  componentTitle = "to do list";
  itemService: ItemService = inject(ItemService);
  browserRefresh = false;
  subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !router.navigated;
      }
    });
  }

  async ngOnInit() {
    if (!this.browserRefresh) {
      const allItems = await this.itemService.getItems();

      for (const item of allItems) {
        this.itemService.getItem(item);
      }

    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
