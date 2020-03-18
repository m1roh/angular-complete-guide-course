import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RecipeDto } from '../../models/recipe-dto.model';
import { map, switchMap } from 'rxjs/operators';
import { RecipeBuilderService } from './recipe-builder.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../stores/root/app.reducer';
import * as RecipesActions from '../../stores/recipes/recipes.actions';
import { GetRecipes, SetRecipes } from '../../stores/recipes/recipes.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor (
    private _http: HttpClient,
    private _recipeBuilderService: RecipeBuilderService,
    private _store: Store<fromRoot.AppState>
  ) {}

  private recipeSubject = new Subject<Recipe[]>();
  recipes$ = this.recipeSubject.asObservable();

  getRecipes(): Observable<RecipeDto> {
    return this._http.get<RecipeDto>(`https://ng8-course.firebaseio.com/recipes.json`);
  }

  getRecipe(index: number): Observable<Recipe> {
    return this._http.get<Recipe>(`https://ng8-course.firebaseio.com/recipes/${index}.json`);
  }

  addRecipe(recipe: Recipe): Observable<RecipeDto> {
    return this._http.post<Recipe>(`https://ng8-course.firebaseio.com/recipes.json`, recipe).pipe(
      switchMap(() => this.getRecipes())
    );
  }

  updateRecipe(index: number, recipe: Recipe): Observable<Recipe> {
    return this._http.patch<Recipe>(`https://ng8-course.firebaseio.com/recipes/${index}.json`, recipe);
  }

  deleteRecipe(index: number): Observable<Recipe> {
    return this._http.delete<Recipe>(`https://ng8-course.firebaseio.com/recipes/${index}.json`);
  }
}
