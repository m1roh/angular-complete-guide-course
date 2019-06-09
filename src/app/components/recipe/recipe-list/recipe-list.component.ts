import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'This is simply a test',
      'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/2591001_qfssh_0129.jpg?itok=hgMNu3Ss')
  ];

  constructor() { }

  ngOnInit() {
  }

}
