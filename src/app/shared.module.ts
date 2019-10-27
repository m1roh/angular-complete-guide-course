import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './components/alert/alert.component';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './directives/placeholder.directive';

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    PlaceholderDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    AlertComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    PlaceholderDirective
  ]
})
export class SharedModule {}
