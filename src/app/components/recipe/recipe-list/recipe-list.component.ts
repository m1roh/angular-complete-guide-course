import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];

  private recipeSub: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSub = this.recipeService.recipes$.subscribe((recipes: Recipe[]) => this.recipes = recipes);
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
