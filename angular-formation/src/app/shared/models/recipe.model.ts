import { Ingredient } from './ingredient.model';

export type Recipe = {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  ingredients?: Ingredient[];
};
