import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import {
  addIngredient,
  deleteIngredient,
  stopEditing,
  updateIngredient,
} from '../shopping-list.actions';
import { AppState } from '../shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.editedItemIndex = stateData.editedIngredientIndex;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        }
      });
    // this.subscription = this.slService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.slService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount,
    //     });
    //   }
    // );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        updateIngredient({
          index: this.editedItemIndex,
          ingredient: newIngredient,
        })
      );
    } else {
      this.store.dispatch(
        addIngredient({
          ingredient: new Ingredient(form.value.name, form.value.amount),
        })
      );
      this.slService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.store.dispatch(stopEditing());
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(deleteIngredient({ index: this.editedItemIndex }));
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
