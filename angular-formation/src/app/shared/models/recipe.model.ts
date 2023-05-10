import { Ingredient } from './ingredient.model';

export type Recipe = {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  selected?: boolean;
  ingredients?: Ingredient[];
};
