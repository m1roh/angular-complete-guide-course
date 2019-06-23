import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingService } from '../../../services/shopping/shopping.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../../services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;

  constructor(private shoppingService: ShoppingService,
              private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {}

  private routeParams$: Subscription;

  ngOnInit(): void {
    this.routeParams$ = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  ngOnDestroy(): void {
    this.routeParams$.unsubscribe();
  }

  onAddToShoppingList(ingredients: Ingredient): void {
    this.shoppingService.addIngredients(ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
