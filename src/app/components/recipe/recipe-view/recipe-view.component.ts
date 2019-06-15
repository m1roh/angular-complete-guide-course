import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {
  public recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

  public onSelectRecipe(recipe: Recipe) {
    this.recipe = recipe;
  }

}
