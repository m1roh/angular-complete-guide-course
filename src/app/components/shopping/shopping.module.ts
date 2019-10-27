import { NgModule } from '@angular/core';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    SharedModule,
    ShoppingRoutingModule
  ]
})
export class ShoppingModule {}
