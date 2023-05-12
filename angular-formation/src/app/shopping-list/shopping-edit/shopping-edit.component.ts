import { Component } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
  name: string;
  amount: number;

  constructor(private shoppingListService: ShoppingListService) {}

  addIngredient() {
    const ingredient: Ingredient = {
      name: this.name,
      amount: this.amount,
    };
    this.shoppingListService.addIngredient(ingredient);
  }
}
