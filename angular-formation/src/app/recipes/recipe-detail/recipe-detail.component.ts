import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent {
  @Input() selectedRecipe: Recipe;
  ngOnInit() {}

  onClick(event) {
    console.log(event.target.innerText);
  }
}
