import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  template: `
    <div class="row">
      <div class="col-xs-12">
        <h1>{{ editMode ? 'Edit' : 'New' }} Recipe</h1>
        <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
          <div class="row">
            <div class="col-xs-12 col-sm-8 form-group">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                class="form-control"
                formControlName="name"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-8 form-group">
              <label for="imagePath">Image URL</label>
              <input
                type="text"
                id="imagePath"
                class="form-control"
                formControlName="imagePath"
                #imagePathInput
              />
            </div>
            <!-- image if imagePath -->
            <div class="col-xs-12 col-sm-4">
              <img
                class="img-responsive"
                [src]="imagePathInput.value"
                *ngIf="imagePathInput.value"
                #image
                (error)="image.src = 'https://via.placeholder.com/500x375'"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-8 form-group">
              <label for="description">Description</label>
              <textarea
                id="description"
                rows="4"
                class="form-control"
                formControlName="description"
              ></textarea>
            </div>
          </div>
          <!-- add ingredients inputs name, amount and x button -->
          <div class="row">
            <div class="col-xs-12 form-group">
              <button
                class="btn btn-primary"
                type="button"
                (click)="addIngredientControl()"
              >
                Add Ingredient
              </button>
            </div>
            <div class="col-xs-12 form-group" formArrayName="ingredients">
              <div
                class="row form-group"
                *ngFor="let ingredient of ingredientControls; let i = index"
                [formGroupName]="i"
              >
                <div class="col-xs-8">
                  <input
                    type="text"
                    title="ingredient-name"
                    class="form-control"
                    formControlName="name"
                  />
                </div>
                <div class="col-xs-2">
                  <input
                    type="number"
                    title="ingredient-amount"
                    class="form-control"
                    formControlName="amount"
                  />
                </div>
                <div class="col-xs-2">
                  <button
                    class="btn btn-danger"
                    type="button"
                    (click)="onDeleteIngredient(i)"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <div class="btn-group">
                <button
                  type="submit"
                  class="btn btn-success"
                  [disabled]="!recipeForm.valid"
                >
                  {{ editMode ? 'Update' : 'Create' }}
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  *ngIf="editMode"
                  (click)="onDelete()"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  recipeId: number;
  recipeForm: FormGroup;
  randomId: number = Math.floor(Math.random() * 1000) + 1;
  recipeEdited: Recipe = {
    id: this.randomId,
    name: '',
    description: '',
    imagePath: 'https://picsum.photos/400',
    ingredients: [],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.editMode = params.id !== null && params.id !== undefined;

      if (params.id) {
        this.recipeId = +params.id;
      }
      this.initForm();
    });
  }

  initForm() {
    if (this.editMode) {
      this.recipeEdited = this.recipeService.getRecipeById(this.recipeId);
    }

    this.setFormValues(this.recipeEdited);
  }

  setFormValues(recipe: Recipe) {
    const recipeIngredients = new FormArray([]);
    if (recipe.ingredients) {
      recipe.ingredients.forEach((ingredient) => {
        recipeIngredients.push(
          new FormGroup({
            id: new FormControl(ingredient.id),
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          })
        );
      });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      imagePath: new FormControl(recipe.imagePath, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  addIngredientControl() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        id: new FormControl(this.randomId),
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
      })
    );
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      if (this.editMode) {
        this.recipeService.updateRecipe({
          id: this.recipeEdited.id,
          ...this.recipeForm.value,
        });
      } else {
        this.recipeService.addRecipe({
          id: this.randomId,
          ...this.recipeForm.value,
        });
      }

      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    } else {
      console.error('Form is invalid');
    }
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeEdited.id);
    this.router.navigate(['/recipes']);
  }

  onDeleteIngredient(ingredientIndex: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(ingredientIndex);
  }

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
