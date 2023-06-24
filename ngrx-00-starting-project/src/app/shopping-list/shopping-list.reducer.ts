import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';
import {
    addIngredient,
    addIngredients,
    deleteIngredient,
    startEditing,
    stopEditing,
    updateIngredient,
} from './shopping-list.actions';

export interface AppState {
    shoppingList: ShoppingListState;
}

export interface ShoppingListState {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
    editedIngredient: null,
    editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
    initialState,
    on(addIngredient, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, action.ingredient],
        };
    }),
    on(addIngredients, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, ...action.ingredients],
        };
    }),
    on(updateIngredient, (state, action) => {
        const updatedIngredient = {
            ...state.ingredients[action.index],
            ...action.ingredient,
        };
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[action.index] = updatedIngredient;
        return {
            ...state,
            ingredients: updatedIngredients,
        };
    }),
    on(deleteIngredient, (state, action) => {
        return {
            ...state,
            ingredients: state.ingredients.filter((ig, igIndex) => {
                return igIndex !== action.index;
            }),
        };
    }),
    on(startEditing, (state, action) => {
        console.log('startEditing', action);

        return {
            ...state,
            editedIngredientIndex: action.index,
            editedIngredient: { ...state.ingredients[action.index] },
        };
    }),
    on(stopEditing, (state) => {
        return {
            ...state,
            editedIngredient: null,
            editedIngredientIndex: -1,
        };
    })
);
