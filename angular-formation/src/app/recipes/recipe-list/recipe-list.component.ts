import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = this.recipeService.getRecipes();
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.recipeUpdated.subscribe(() => {
      this.recipes = this.recipeService.getRecipes();
    });
  }
}
