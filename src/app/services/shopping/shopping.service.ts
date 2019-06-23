import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  private ingredientsSubject = new Subject<Ingredient[]>();
  ingredients$ = this.ingredientsSubject.asObservable();

  private startEditingSubject = new Subject<number>();
  startEditing$ = this.startEditingSubject.asObservable();

  getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }

  getIngredient(index: number): Ingredient {
    return [...this.ingredients][index];
  }

  addIngredients(ingredients: Ingredient | Ingredient[]): void {
    if (Array.isArray(ingredients)) {
      this.ingredients.push(...ingredients);
    } else {
      this.ingredients.push(ingredients);
    }

    this.ingredientsSubject.next([...this.ingredients]);
  }

  startEditing(index: number): void {
    this.startEditingSubject.next(index);
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsSubject.next([...this.ingredients]);
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsSubject.next([...this.ingredients]);
  }
}
