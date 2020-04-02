import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as AuthActions from './stores/auth/auth.actions';
import * as fromRoot from './stores/root/app.reducer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _store: Store<fromRoot.AppState>, private _translate: TranslateService) {
    _translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
    this._store.dispatch(new AuthActions.AutoLogin());
  }
}
