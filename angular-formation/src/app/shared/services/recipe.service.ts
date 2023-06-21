import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import {
  BehaviorSubject,
  Subject,
  catchError,
  finalize,
  map,
  of,
  take,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  API_URL =
    'https://ng-http-request-training-default-rtdb.europe-west1.firebasedatabase.app';

  recipesUpdate: Subject<void> = new Subject<void>();

  recipes$ = new BehaviorSubject<Recipe[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  errorMessage: string;

  constructor(private http: HttpClient) { }

  getRecipes() {
    this.isLoading$.next(true);
    this.http
      .get(`${this.API_URL}/recipes.json`)
      .pipe(
        map((response) => {
          // throw new Error('error');
          if (!response) {
            return [];
          }
          return Object.entries(response).map(([key, value]) => {
            return { ...value, id: key };
          });
        }),
        take(1),
        finalize(() => this.isLoading$.next(false)),
        catchError((error) => {
          console.error('error retreving recipes : ', error);
          this.errorMessage = `Error retreving recipes : ${error.error.error}`;
          return of([]);
        })
      )
      .subscribe((recipes) => {
        this.recipes$.next(recipes);
      });
  }

  getRecipeById(id: string) {
    if (this.recipes$.value.length > 0) {
      return of(this.recipes$.value.find((recipe) => recipe.id === id));
    } else {
      return this.http.get<Recipe>(`${this.API_URL}/recipes/${id}.json`).pipe(
        map((recipe) => {
          return { ...recipe, id };
        })
      );
    }
  }

  addRecipe(recipe: Recipe) {
    return this.http
      .post(`${this.API_URL}/recipes.json`, recipe)
      .subscribe((response) => {
        this.recipes$.next([
          ...this.recipes$.value,
          { ...recipe, id: response['name'] },
        ]);
      });
  }

  updateRecipe(recipe: Recipe) {
    return this.http
      .put<Recipe>(`${this.API_URL}/recipes/${recipe.id}.json`, recipe)
      .subscribe((response: Recipe) => {
        this.recipes$.next(
          this.recipes$.value.map((r) => (r.id === response.id ? response : r))
        );
      });
  }

  deleteRecipe(id: string) {
    return this.http.delete(`${this.API_URL}/recipes/${id}.json`).pipe(
      take(1),
      catchError((error) => {
        console.error('ERROR ON SERVICE: ', error);
        this.errorMessage = `Error deleting recipe : ${error.error.error}`;
        throw error;
      })
    );
  }
}
