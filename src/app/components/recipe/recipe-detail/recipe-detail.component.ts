import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingService } from '../../../services/shopping/shopping.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import * as fromRoot from '../../../stores/root/app.reducer';
import * as fromRecipes from '../../../stores/recipes/recipes.reducer';
import { Store } from '@ngrx/store';

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
              private route: ActivatedRoute,
              private _store: Store<fromRoot.AppState>) {}

  private destroy$ = new Subject<any>();

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$),
      switchMap((params: Params) => {
        this.id = params['id'];
        return this.recipeService.getRecipe(this.id);
      })
    ).subscribe((recipe: Recipe) => this.recipe = recipe);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAddToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingService.addIngredients(ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
