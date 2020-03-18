import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { Subject } from 'rxjs';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../stores/root/app.reducer';
import * as fromRecipes from '../../../stores/recipes/recipes.reducer';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit, OnDestroy {
  recipes: Recipe[];

  private destroy$ = new Subject<any>();

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private _store: Store<fromRoot.AppState>) {}

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => this.recipes = data.recipes);
    this._store.select('recipes')
      .pipe(
        takeUntil(this.destroy$),
        map((recipeState: fromRecipes.State) => recipeState.recipes)
      ).subscribe((recipes: Recipe[]) => this.recipes = recipes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
