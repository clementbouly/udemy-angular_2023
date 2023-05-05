import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private selectedRecipe: Recipe;
  recipeUpdated = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    {
      name: 'A Test Recipe',
      description: 'This is simply a test',
      imagePath:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
    },
    {
      name: 'Vegetable Soup',
      description: 'A delicious soup with vegetables',
      imagePath:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCzGbx87i8TCsYsbiuPxv9Eios1qhpPTdVbg&usqp=CAU',
    },
  ];

  constructor() {}

  getRecipes() {
    return [...this.recipes];
  }

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
    this.recipes = this.recipes.map((recipe) => {
      if (recipe === this.selectedRecipe) {
        return { ...recipe, selected: true };
      } else {
        return { ...recipe, selected: false };
      }
    });
    this.recipeUpdated.emit(recipe);
  }
}
