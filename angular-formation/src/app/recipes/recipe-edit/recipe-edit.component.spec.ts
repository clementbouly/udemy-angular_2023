import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { RecipeEditComponent } from './recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { By } from '@angular/platform-browser';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let mockActivatedRoute, mockRecipeService;

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ id: '1' }),
    };
    mockRecipeService = jasmine.createSpyObj(['getRecipeById']);

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
    const descriptionTextarea = fixture.debugElement.query(By.css('#description'));
    expect(nameInput).toBeTruthy();
    expect(imagePathInput).toBeTruthy();
    expect(descriptionTextarea).toBeTruthy();
  });

  it('should have a label with text "Name"', () => {
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('label[for="name"]'));
    expect(label.nativeElement.textContent.trim()).toBe('Name');
  });

  it('should load recipe data', () => {
    mockRecipeService.getRecipeById.and.returnValue({
      name: 'Test Recipe',
      description: 'Test Description',
      imagePath: 'https://picsum.photos/400',
    });

    component.loadRecipeData();

    expect(component.recipeEdited).toBeDefined();
    expect(component.recipeEdited.name).toEqual('Test Recipe');
    expect(component.recipeEdited.description).toEqual('Test Description');
    expect(component.recipeEdited.imagePath).toEqual(
      'https://picsum.photos/400'
    );
  });
});
