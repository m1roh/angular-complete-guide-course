import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IngredientResolverService } from '../../services/shopping/ingredient-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
    resolve: {
      ingredients: IngredientResolverService
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class ShoppingRoutingModule {}
