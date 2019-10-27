import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
