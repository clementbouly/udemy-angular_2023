import { Ingredient } from './ingredient.model';

export type Recipe = {
  id?: string;
  name: string;
  description: string;
  imagePath: string;
  ingredients?: Ingredient[];
};
