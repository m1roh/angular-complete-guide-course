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
  public ingredients$ = this.ingredientsSubject.asObservable();

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[] | Ingredient): void {
    if (Array.isArray(ingredients)) {
      this.ingredients.push(...ingredients);
    } else {
      this.ingredients.push(ingredients);
    }

    this.ingredientsSubject.next(this.ingredients.slice());
  }
}
