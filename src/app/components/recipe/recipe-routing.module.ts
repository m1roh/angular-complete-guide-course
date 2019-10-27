import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../services/auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverService } from '../../services/recipe/recipe-resolver.service';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';

const routes: Routes = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {}
