import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
  editIngredientSubscription: Subscription;
  @ViewChild('shoppingForm') shoppingForm: NgForm;
  editMode = false;
  editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.editIngredientSubscription =
      this.shoppingListService.$ingredientEdited.subscribe((ingredient) => {
        this.editedIngredient = ingredient;
        this.shoppingForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
        });
        this.editMode = true;
      });
  }

  onSubmit(form: NgForm) {
    const ingredientId = this.editedIngredient
      ? this.editedIngredient.id
      : Math.floor(Math.random() * 1000);
    const ingredient: Ingredient = {
      id: ingredientId,
      name: form.value.name,
      amount: form.value.amount,
    };
    if (this.editMode) {
      this.shoppingListService.updateIngredient(ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.resetForm();
  }

  resetForm() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  deleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editedIngredient.id);
    this.resetForm();
  }

  ngOnDestroy() {
    this.editIngredientSubscription.unsubscribe();
  }
}
