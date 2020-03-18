import { Action } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';

export const GET_RECIPES = '[Recipes] Get Recipes';
export const SET_RECIPES = '[Recipes] Set Recipes';

export class GetRecipes implements Action {
  public readonly type = GET_RECIPES;
}

export class SetRecipes implements Action {
  public readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export type RecipesActions =
  | GetRecipes
  | SetRecipes;
