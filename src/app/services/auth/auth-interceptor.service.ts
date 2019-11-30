import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { exhaustMap, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../stores/root/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService,
              private _store: Store<fromRoot.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap((user: User) => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });

        return next.handle(modifiedReq);
      }));
  }
}
