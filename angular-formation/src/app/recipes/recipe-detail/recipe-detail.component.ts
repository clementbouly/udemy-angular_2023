import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  ingredients$: Observable<Ingredient[]>;
  @Input('id') recipeId?: string;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      this.setSelectedRecipe(id);
    });
    this.recipeService.recipesUpdate.subscribe(() => {
      this.setSelectedRecipe(this.recipeId);
    });
  }

  setSelectedRecipe(id: string) {
    this.recipeService.getRecipeById(id).subscribe((recipe) => {
      this.selectedRecipe = recipe;
    });
  }

  onAddToShoppingList() {
    this.shoppingListService.addIngredients(this.selectedRecipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService
      .deleteRecipe(this.selectedRecipe.id)
      .subscribe((response) => {
        this.router.navigate(['/recipes']);
        this.recipeService.recipesUpdate.next();
      });
  }
}
