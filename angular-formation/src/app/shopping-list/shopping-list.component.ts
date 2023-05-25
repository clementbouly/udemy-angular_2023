import { Component } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';
import { Observable, Subscription, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  ingredients$: Observable<Ingredient[]>;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients$ = this.shoppingService.getIngredients();
  }

  onEditItem(ingredient: Ingredient) {
    this.shoppingService.$ingredientEdited.next(ingredient);
  }
}
