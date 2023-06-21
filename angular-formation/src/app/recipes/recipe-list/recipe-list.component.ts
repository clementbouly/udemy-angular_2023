import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]> = this.recipeService.recipes$;
  isLoading = this.recipeService.isLoading$;
  errorMessage: string;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getRecipes();
    // this.recipeService.recipesUpdate.subscribe(() => this.initRecipes());
  }


}
