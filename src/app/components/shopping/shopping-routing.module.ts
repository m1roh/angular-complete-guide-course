import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IngredientResolverService } from '../../services/shopping/ingredient-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule {}
