import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Observable, catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  isLoading = false;
  errorMessage: string;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.initRecipes();
    this.recipeService.recipesUpdate.subscribe(() => this.initRecipes());
  }

  initRecipes() {
    this.isLoading = true;
    this.recipes$ = this.recipeService.getRecipes().pipe(
      catchError((error) => {
        this.errorMessage = `Error retreving recipes : ${error.error.error}`;
        return of([]);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}
