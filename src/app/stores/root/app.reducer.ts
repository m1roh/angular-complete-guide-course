import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/auth.reducer';
import * as fromRecipes from '../recipes/recipes.reducer';
import * as fromShoppingList from '../shopping-list/shopping-list.reducer';

export interface AppState {
  auth: fromAuth.State;
  recipes: fromRecipes.State;
  shoppingList: fromShoppingList.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer,
  shoppingList: fromShoppingList.shoppingListReducer
};
