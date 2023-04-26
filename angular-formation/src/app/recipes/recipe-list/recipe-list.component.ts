import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    {
      name: 'A Test Recipe',
      description: 'This is simply a test',
      imagePath: 'https://picsum.photos/300/200',
    },
    {
      name: 'Vegetable Soup',
      description: 'A delicious soup with vegetables',
      imagePath: 'https://picsum.photos/300/200',
    },
  ];
}
