import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    { name: 'Apples', amount: 5, id: 1 },
    { name: 'Tomatoes', amount: 10, id: 2 },
    { name: 'Potatoes', amount: 15, id: 3 },
    { name: 'Bananas', amount: 0, id: 4 },
  ];

  private $ingredients = new BehaviorSubject<Ingredient[]>(this.ingredients);
  $ingredientEdited = new Subject<Ingredient>();

  constructor(private http: HttpClient) {}

  getIngredients() {
    // return this.http
    //   .get<Ingredient[]>(
    //     'https://ng-http-request-training-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json'
    //   )
    //   .pipe(
    //     map((response) => {
    //       if (!response) {
    //         return [];
    //       }
    //       return Object.entries(response).map(([key, value]) => {
    //         return { ...value, id: key };
    //       });
    //     })
    //   );

    return this.$ingredients.asObservable();
  }

  addIngredient(ingredient: Ingredient) {
    this.addIngredientOrUpdateAmount(ingredient);
    this.$ingredients.next(this.ingredients);
    console.log(this.ingredients);
  }

  deleteIngredient(id: number) {
    const index = this.ingredients.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.ingredients.splice(index, 1);
    }
    this.$ingredients.next(this.ingredients);
  }

  updateIngredient(ingredient: Ingredient) {
    const index = this.ingredients.findIndex(
      (item) => item.id === ingredient.id
    );

    if (index !== -1) {
      this.ingredients[index] = ingredient;

      this.$ingredients.next(this.ingredients);
    }
  }

  addIngredientOrUpdateAmount(ingredient: Ingredient) {
    // Find existing ingredient in array
    const index = this.ingredients.findIndex(
      (item) => item.name === ingredient.name
    );

    // If found, add new amount to existing amount
    if (index !== -1) {
      this.ingredients[index].amount += ingredient.amount;
    } else {
      // If not found, push new ingredient to array
      this.ingredients.push(ingredient);
    }
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => this.addIngredient(ingredient));
  }
}
