import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { RecipeEditComponent } from './recipe-edit.component';
import {
  ReactiveFormsModule
} from '@angular/forms';
import { of } from 'rxjs';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { By } from '@angular/platform-browser';
import { Recipe } from 'src/app/shared/models/recipe.model';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let mockActivatedRoute, mockRecipeService, recipe: Recipe, newRecipe: Recipe;

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ id: '1' }),
    };
    recipe = {
      id: 1,
      name: 'Test Recipe',
      description: 'Test Description',
      imagePath: 'https://picsum.photos/400',
      ingredients: [
        {
          id: 1,
          name: 'Test Ingredient',
          amount: 2,
        },
      ],
    };

    newRecipe = {
      id: null,
      name: '',
      description: '',
      imagePath: 'https://picsum.photos/400',
      ingredients: [],
    };

    mockRecipeService = jasmine.createSpyObj([
      'getRecipeById',
      'addRecipe',
      'updateRecipe',
    ]);
    mockRecipeService.getRecipeById.and.returnValue(recipe);

    await TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RecipeService, useValue: mockRecipeService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.recipeForm).toBeDefined();
  });

  it('should render the form correctly', () => {
    fixture.detectChanges();
    const nameInput = fixture.debugElement.query(By.css('#name'));
    const imagePathInput = fixture.debugElement.query(By.css('#imagePath'));
    const descriptionTextarea = fixture.debugElement.query(
      By.css('#description')
    );
    expect(nameInput).toBeTruthy();
    expect(imagePathInput).toBeTruthy();
    expect(descriptionTextarea).toBeTruthy();
  });

  it('should disable the submit button when the form is invalid', () => {
    component.recipeForm.controls['name'].setValue('');
    component.recipeForm.controls['description'].setValue('');
    component.recipeForm.controls['imagePath'].setValue('');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });

  it('should have a label with text "Name"', () => {
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('label[for="name"]'));
    expect(label.nativeElement.textContent.trim()).toBe('Name');
  });

  it('should set the form values correctly if editMode is true', () => {
    component.editMode = true;
    component.initForm();
    expect(component.recipeForm.value.name).toEqual('Test Recipe');
    expect(component.recipeForm.value.description).toEqual('Test Description');
    expect(component.recipeForm.value.imagePath).toEqual(
      'https://picsum.photos/400'
    );
  });

  // should set the form values correctly if editMode is false
  it('should set the form values correctly if editMode is false', () => {
    component.editMode = false;
    component.recipeEdited = newRecipe;
    component.initForm();
    fixture.detectChanges();

    expect(component.recipeForm.value.name).toEqual('');
    expect(component.recipeForm.value.description).toEqual('');
    expect(component.recipeForm.value.imagePath).toEqual(
      'https://picsum.photos/400'
    );
  });

  it('should call updateRecipe method when the form is submitted in EditMode', () => {
    component.editMode = true;
    component.recipeEdited = recipe;
    component.recipeForm.controls['name'].setValue(recipe.name);
    component.recipeForm.controls['description'].setValue(recipe.description);
    component.recipeForm.controls['imagePath'].setValue(recipe.imagePath);
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    submitButton.nativeElement.click();
    expect(mockRecipeService.updateRecipe).toHaveBeenCalledWith(recipe);
  });

  // should call addRecipe method when the form is submitted with EditMode false
  it('should call addRecipe method when the form is submitted with EditMode false', () => {
    component.editMode = false;
    component.recipeEdited = undefined;
    component.recipeForm.controls['name'].setValue(recipe.name);
    component.recipeForm.controls['description'].setValue(recipe.description);
    component.recipeForm.controls['imagePath'].setValue(recipe.imagePath);
    recipe.id = component.randomId;
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    submitButton.nativeElement.click();
    // call addRecipe method with the recipe form value
    expect(mockRecipeService.addRecipe).toHaveBeenCalledWith(recipe);
  });
});
