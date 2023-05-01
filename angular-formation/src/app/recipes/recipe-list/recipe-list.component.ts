import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  @Output() onRecipeSelected = new EventEmitter<Recipe>();

  onSelected(recipe: Recipe) {
    this.onRecipeSelected.emit(recipe);
  }

  recipes: Recipe[] = [
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
}
