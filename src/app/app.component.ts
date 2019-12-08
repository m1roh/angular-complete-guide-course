import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as AuthActions from './stores/auth/auth.actions';
import * as fromRoot from './stores/root/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _store: Store<fromRoot.AppState>) {}

  ngOnInit(): void {
    this._store.dispatch(new AuthActions.AutoLogin());
  }
}
