import {NgModule} from '@angular/core';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeListRoutingModule } from './recipe-list-routing.module';
import { CommonModule } from '@angular/common';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';

@NgModule({
  declarations: [
    // RecipeListComponent,
    // RecipeItemComponent
  ],
  exports: [
    // RecipeListComponent
  ],
  imports: [CommonModule, RecipeListRoutingModule],
  providers: [],
})
export class RecipeListModule {
}
