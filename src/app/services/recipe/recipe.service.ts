import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RecipeDto } from '../../models/recipe-dto.model';
import { map, switchMap } from 'rxjs/operators';
import { RecipeBuilderService } from './recipe-builder.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor (
    private _http: HttpClient,
    private _recipeBuilderService: RecipeBuilderService
  ) {}

  private recipeSubject = new Subject<Recipe[]>();
  recipes$ = this.recipeSubject.asObservable();

  getRecipes(): Observable<Recipe[]> {
    return this._http.get(`https://ng8-course.firebaseio.com/recipes.json`).pipe(
      map((recipes: RecipeDto) => {
        const recipeList = this._recipeBuilderService.buildList(recipes);
        this.recipeSubject.next(recipeList);
        return recipeList;
      })
    );
  }

  getRecipe(index: number): Observable<Recipe> {
    return this._http.get<Recipe>(`https://ng8-course.firebaseio.com/recipes/${index}.json`);
  }

  addRecipe(recipe: Recipe): Observable<Recipe[]> {
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
