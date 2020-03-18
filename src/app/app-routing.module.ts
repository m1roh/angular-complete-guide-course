import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings } from '@gilsdav/ngx-translate-router';
import { LocalizeRouterHttpLoader } from '@gilsdav/ngx-translate-router-http-loader';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  imports: [
    TranslateModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    LocalizeRouterModule.forRoot(appRoutes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (translate, location, settings, http) =>
          new LocalizeRouterHttpLoader(translate, location, { ...settings, alwaysSetPrefix: true }, http),
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      }
    })
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class AppRoutingModule {}
