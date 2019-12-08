import { Actions, Effect, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { UserDto } from '../../models/user.dto';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  public authLogin = this._actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => this._authService.login(authData.payload.email, authData.payload.password)
      .pipe(
        map((resData: UserDto) => this._authService.handleAuthentication(resData)),
        catchError(this._authService.handleError)
      )
    )
  );

  @Effect({ dispatch: false })
  public authRedirect = this._actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() =>  this._router.navigate(['/']))
  );

  @Effect()
  public authSignup = this._actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => this._authService.signUp(authData.payload.email, authData.payload.password)
      .pipe(
        map((resData: UserDto) => this._authService.handleAuthentication(resData)),
        catchError(this._authService.handleError)
      )
    )
  );

  @Effect({ dispatch: false })
  public authLogout = this._actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this._authService.logout();
      this._router.navigate(['/auth']);
    })
  );

  @Effect()
  public autoLogin = this._actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => this._authService.autoLogin())
  );

  constructor(private _actions$: Actions, private _authService: AuthService, private _router: Router) {}
}
