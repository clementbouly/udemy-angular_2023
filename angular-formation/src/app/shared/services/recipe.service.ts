import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { BehaviorSubject, Subject, delay, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  API_URL =
    'https://ng-http-request-training-default-rtdb.europe-west1.firebasedatabase.app';
  private recipes: Recipe[] = [
    // {
    //   id: 1,
    //   name: 'A test Recipe',
    //   description: 'This is simply a test',
    //   imagePath:
    //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
    //   ingredients: [
    //     { id: 5, name: 'Meat', amount: 1 },
    //     { id: 6, name: 'French Fries', amount: 20 },
    //     { id: 7, name: 'Carrots', amount: 5 },
    //   ],
    // },
    // {
    //   id: 2,
    //   name: 'Vegetable Soup',
    //   description: 'A delicious soup with vegetables',
    //   imagePath:
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCzGbx87i8TCsYsbiuPxv9Eios1qhpPTdVbg&usqp=CAU',
    //   ingredients: [
    //     { id: 7, name: 'Carrots', amount: 5 },
    //     { id: 8, name: 'Potatoes', amount: 10 },
    //   ],
    // },
  ];

  recipesUpdate: Subject<void> = new Subject<void>();

  recipes$ = new BehaviorSubject<Recipe[]>(this.recipes);

  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get<Recipe[]>(`${this.API_URL}/recipes.json`).pipe(
      map((response) => {
        if (!response) {
          return [];
        }
        return Object.entries(response).map(([key, value]) => {
          return { ...value, id: key };
        });
      }),
      delay(1000)
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
