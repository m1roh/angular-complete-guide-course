import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as fromRoot from '../../stores/root/app.reducer';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _localize: LocalizeRouterService,
    private _store: Store<fromRoot.AppState>,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this._store.select('auth').pipe(
        take(1),
        map(authState => authState.user),
        map((user: User) => {
          const isAuth = !!user;
          const authPath = this._localize.translateRoute('/auth');

          if (isAuth) {
            return isAuth;
          }

          return this._router.createUrlTree([authPath]);
      }));
  }

}
