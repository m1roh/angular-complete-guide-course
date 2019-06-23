import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { Ingredient } from 'src/app/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  private recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'This is simply a test',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3roc9z2dhVfAw9VG2T4IfcFqeuhD_LzBBd-p2u3C5eBRxkJbN',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Another test Recipe',
      'This is simply another a test',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQXA5pVzN0ws5JStSH_KOq7FVKufGThwewPsw7svJ6PhOS9niV',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  getRecipe(index: number): Recipe {
    return [...this.recipes][index];
  }
}
