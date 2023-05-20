import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingredientFormat',
})
export class IngredientFormatPipe implements PipeTransform {
  transform(value: string): string {
    return ` - (${value})`;
  }
}
