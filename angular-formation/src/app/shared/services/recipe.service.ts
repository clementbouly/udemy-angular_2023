import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: 1,
      name: 'A Test Recipe',
      description: 'This is simply a test',
      imagePath:
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
      ingredients: [
        { id: 5, name: 'Meat', amount: 1 },
        { id: 6, name: 'French Fries', amount: 20 },
      ],
    },
    {
      id: 2,
      name: 'Vegetable Soup',
      description: 'A delicious soup with vegetables',
      imagePath:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCzGbx87i8TCsYsbiuPxv9Eios1qhpPTdVbg&usqp=CAU',
      ingredients: [
        { id: 7, name: 'Carrots', amount: 5 },
        { id: 8, name: 'Potatoes', amount: 10 },
      ],
    },
  ];

  constructor() {}

  getRecipes() {
    return [...this.recipes];
  }

  getRecipeById(id: number) {
    return this.recipes.find((recipe) => recipe.id === id);
  }
}
