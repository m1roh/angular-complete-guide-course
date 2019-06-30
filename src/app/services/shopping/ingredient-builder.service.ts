import { Injectable } from '@angular/core';
import { IngredientDto } from '../../models/ingredient-dto.model';
import { Ingredient } from '../../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientBuilderService {

  public buildList(ingredients: IngredientDto): Ingredient[] {
    const ingredientList: Ingredient[] = [];

    for (const [key, value] of Object.entries(ingredients)) {
      ingredientList.push(new Ingredient(value.name, value.amount, key));
    }

    return ingredientList;
  }
}
