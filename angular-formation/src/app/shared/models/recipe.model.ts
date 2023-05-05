import { Ingredient } from "./ingredient.model";

export type Recipe = {
  name: string;
  description: string;
  imagePath: string;
  selected?: boolean;
  ingredients?: Ingredient[];
};
