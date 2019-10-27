import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./components/recipe/recipe.module').then((m) => m.RecipeModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./components/shopping/shopping.module').then((m) => m.ShoppingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
