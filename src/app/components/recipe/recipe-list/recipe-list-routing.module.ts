import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RecipeListComponent } from './recipe-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';


const routes: Routes = [
  {path: '', component: RecipeListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class RecipeListRoutingModule {
}
