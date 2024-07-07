import { Component, inject, OnInit, OnDestroy} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemComponent } from "./item/item.component";
import { ItemService } from "./item/item.service";
import { Subscription } from "rxjs";
import { NavigationStart, Router } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, ItemComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  componentTitle = "to do list";
  itemService: ItemService = inject(ItemService);
  browserRefresh = false;
  subscription: Subscription;

  constructor(private router: Router) {
    console.log("app component constructor")
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !router.navigated;
      }
    });
  }

  ngOnInit() {
    if (!this.browserRefresh) {
      console.log("app component ngOnInit")
      this.itemService.getItems();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
