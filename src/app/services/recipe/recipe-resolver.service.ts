import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../stores/root/app.reducer';
import * as RecipesActions from '../../stores/recipes/recipes.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private _actions$: Actions, private _store: Store<fromRoot.AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    this._store.dispatch(new RecipesActions.GetRecipes());
    return this._actions$.pipe(
      ofType(RecipesActions.SET_RECIPES),
      take(1)
    );
  }
}
