import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/recipe/recipe-item/recipe-item.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { RecipeViewComponent } from './components/recipe/recipe-view/recipe-view.component';
import { ShoppingListComponent } from './components/shopping/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './components/shopping/shopping-list-edit/shopping-list-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeViewComponent,
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
