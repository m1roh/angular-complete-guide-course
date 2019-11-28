import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IngredientDto } from '../../models/ingredient-dto.model';
import { IngredientBuilderService } from './ingredient-builder.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../stores/shopping-list/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http: HttpClient,
              private ingredientBuilder: IngredientBuilderService,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {}

  private ingredientsSubject = new Subject<Ingredient[]>();
  ingredients$ = this.ingredientsSubject.asObservable();

  private startEditingSubject = new Subject<string>();
  startEditing$ = this.startEditingSubject.asObservable();

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get(`https://ng8-course.firebaseio.com/ingredients.json`).pipe(
      map((ingredients: IngredientDto) => {
        const ingredientList = this.ingredientBuilder.buildList(ingredients);
        // this.ingredientsSubject.next(ingredientList);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredientList));
        return ingredientList;
      })
    );
  }

  getIngredient(index: string): Observable<Ingredient> {
    return this.http.get<Ingredient>(`https://ng8-course.firebaseio.com/ingredients/${index}.json`);
  }

  addIngredients(ingredients: Ingredient[]): void {
    ingredients.forEach((ingredient: Ingredient) => this.addIngredient(ingredient).subscribe());
  }

  addIngredient(ingredient: Ingredient): Observable<Ingredient[]> {
    return this.http.post<Ingredient>(`https://ng8-course.firebaseio.com/ingredients.json`, ingredient).pipe(
      switchMap(() => this.getIngredients())
    );
  }

  startEditing(index: string): void {
    this.startEditingSubject.next(index);
  }

  updateIngredient(index: string, ingredient: Ingredient): Observable<Ingredient> {
    return this.http.patch<Ingredient>(`https://ng8-course.firebaseio.com/ingredients/${index}.json`, ingredient);
  }

  deleteIngredient(index: string): Observable<Ingredient> {
    return this.http.delete<Ingredient>(`https://ng8-course.firebaseio.com/ingredients/${index}.json`);
  }
}
