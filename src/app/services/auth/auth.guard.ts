import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.user$.pipe(
      take(1),
      map((user: User) => {
        const isAuth = !!user;

        if (isAuth) {
          return isAuth;
        }

        return this._router.createUrlTree(['/auth']);
    }));
  }

}
