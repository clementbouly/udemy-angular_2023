import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { BehaviorSubject, Subject, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  API_URL =
    'https://ng-http-request-training-default-rtdb.europe-west1.firebasedatabase.app';

  recipesUpdate: Subject<void> = new Subject<void>();

  recipes$ = new BehaviorSubject<Recipe[]>([]);

  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get<Recipe[]>(`${this.API_URL}/recipes.json`).pipe(
      map((response) => {
        // throw new Error('error');
        if (!response) {
          return [];
        }
        return Object.entries(response).map(([key, value]) => {
          return { ...value, id: key };
        });
      }),
      tap((recipes) => {
        this.recipes$.next(recipes);
      })
    );
  }

  getRecipeById(id: string) {
    return this.http.get<Recipe>(`${this.API_URL}/recipes/${id}.json`).pipe(
      map((recipe) => {
        return { ...recipe, id };
      })
    );
  }

  addRecipe(recipe: Recipe) {
    return this.http
      .post(`${this.API_URL}/recipes.json`, recipe)
      .subscribe((response) => {
        this.recipesUpdate.next();
      });
  }

  updateRecipe(recipe: Recipe) {
    return this.http
      .put(`${this.API_URL}/recipes/${recipe.id}.json`, recipe)
      .subscribe((response) => {
        this.recipesUpdate.next();
      });
  }

  deleteRecipe(id: string) {
    return this.http.delete(`${this.API_URL}/recipes/${id}.json`);
  }
}
