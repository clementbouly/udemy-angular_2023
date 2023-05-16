import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  recipeForm: FormGroup;
  recipeEdited: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadRecipeData();
  }

  private initForm() {
    this.recipeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      imagePath: new FormControl(
        'https://picsum.photos/400',
        Validators.required
      ),
    });
  }

  loadRecipeData() {
    this.activatedRoute.params.subscribe((params) => {
      this.editMode = params.id != null;
      this.recipeEdited = this.recipeService.getRecipeById(+params.id);

      if (this.recipeEdited) {
        this.setFormValues(this.recipeEdited);
      }
    });
  }

  private setFormValues(recipe: Recipe) {
    this.recipeForm.setValue({
      name: recipe.name,
      description: recipe.description,
      imagePath: recipe.imagePath,
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const recipe: Recipe = {
        id: Math.floor(Math.random() * 1000) + 1,
        name: this.recipeForm.value.name,
        description: this.recipeForm.value.description,
        imagePath: this.recipeForm.value.imagePath,
      };

      if (this.editMode) {
        recipe.id = this.recipeEdited.id;
        this.recipeService.updateRecipe(recipe);
      } else {
        this.recipeService.addRecipe(recipe);
      }

      this.router.navigate(['/recipes']);
    } else {
      console.error('Form is invalid');
    }
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeEdited.id);
    this.router.navigate(['/recipes']);
  }
}
