import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  $recipes: Observable<Recipe[]>;
  isLoading = false;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.initRecipes();
    this.recipeService.$recipesUpdate.subscribe(() => this.initRecipes());
  }

  initRecipes() {
    this.isLoading = true;
    this.$recipes = this.recipeService
      .getRecipes()
      .pipe(tap({ complete: () => (this.isLoading = false) }));
  }
}
