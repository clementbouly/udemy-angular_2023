import { Component, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
  name: string;
  amount: number;
  @Output() ingredientAdded: EventEmitter<Ingredient> = new EventEmitter();

  addIngredient() {
    const ingredient: Ingredient = {
      name: this.name,
      amount: this.amount,
    };
    this.ingredientAdded.emit(ingredient);
  }
}
