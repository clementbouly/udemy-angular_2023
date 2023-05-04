import { Component, WritableSignal, effect, signal } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  selectedRecipe: Recipe;
  count: WritableSignal<number> = signal(0);

  constructor() {
    effect(() => {
      console.log(`The count is: ${this.count()}`);
    });
  }

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }

  testSignal() {
    this.count.update((value) => value + 1);
  }
}
