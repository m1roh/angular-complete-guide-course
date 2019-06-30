import { Injectable } from '@angular/core';
import { RecipeDto } from '../../models/recipe-dto.model';
import { Recipe } from '../../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeBuilderService {

  public buildList(recipes: RecipeDto): Recipe[] {
    const recipesList: Recipe[] = [];

    for (const [key, value] of Object.entries(recipes)) {
      recipesList.push(new Recipe(value.name, value.description, value.imagePath, value.ingredients, key));
    }

    return recipesList;
  }
}
