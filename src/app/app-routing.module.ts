import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingListComponent } from './components/shopping/shopping-list/shopping-list.component';
import { RecipeViewComponent } from './components/recipe/recipe-view/recipe-view.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './services/recipe/recipe-resolver.service';
import { IngredientResolverService } from './services/shopping/ingredient-resolver.service';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './services/auth/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipeViewComponent,
    canActivate: [AuthGuard],
    resolve: {
      recipes: RecipeResolverService
    },
    children: [
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    resolve: {
      ingredients: IngredientResolverService
    }
  },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
