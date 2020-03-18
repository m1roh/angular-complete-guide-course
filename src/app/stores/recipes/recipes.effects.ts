import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipes.actions';
import { map, switchMap } from 'rxjs/operators';
import { RecipeService } from '../../services/recipe/recipe.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeDto } from '../../models/recipe-dto.model';
import { RecipeBuilderService } from '../../services/recipe/recipe-builder.service';

@Injectable()
export class RecipesEffects {
  @Effect()
  public getRecipes = this._actions$.pipe(
    ofType(RecipesActions.GET_RECIPES),
    switchMap(() => this._recipeService.getRecipes()),
    map((recipes: RecipeDto) => this._recipeBuilderService.buildList(recipes)),
    map((recipes: Recipe[]) => new RecipesActions.SetRecipes(recipes))
  );
  constructor(private _actions$: Actions, private _recipeService: RecipeService, private _recipeBuilderService: RecipeBuilderService) {}
}
