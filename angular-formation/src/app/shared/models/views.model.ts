const RECIPE = 'recipe';
const SHOPPING_LIST = 'shopping-list';
export const DEFAULT_VIEW = RECIPE;

export type ViewType = typeof RECIPE | typeof SHOPPING_LIST;

type Views = {
  RECIPE: typeof RECIPE;
  SHOPPING_LIST: typeof SHOPPING_LIST;
};

export const VIEW_TYPES: Views = {
  RECIPE: RECIPE,
  SHOPPING_LIST: SHOPPING_LIST,
};
