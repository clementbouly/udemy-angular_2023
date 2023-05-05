import { Component, WritableSignal, effect, signal } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  count: WritableSignal<number> = signal(0);

  constructor() {
    // effect(() => {
    //   console.log(`The count is: ${this.count()}`);
    // });
  }

  testSignal() {
    this.count.update((value) => value + 1);
  }
}
