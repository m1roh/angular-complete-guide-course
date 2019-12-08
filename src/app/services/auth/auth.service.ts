import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Store } from '@ngrx/store';

import * as AuthActions from '../../stores/auth/auth.actions';
import * as fromRoot from '../../stores/root/app.reducer';
import { AuthenticateSuccess, AuthenticateFail } from '../../stores/auth/auth.actions';
import { AuthResponseDto } from '../../models/auth-response-dto';
import { environment } from '../../../environments/environment';
import { UserBuilder } from '../../models/user-builder';
import { UserDto } from '../../models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _signInUrl = environment.signInUrl + environment.firebaseAppKey;
  private _signUpUrl = environment.signUpUrl + environment.firebaseAppKey;
  private _tokenExpirationTimer: number;

  private _noUserAction = { type: 'NO USER' };

  constructor(
    private _http: HttpClient,
    private _store: Store<fromRoot.AppState>,
    private _userBuilder: UserBuilder) { }

  public signUp(email: string, password: string): Observable<UserDto> {
    return this._http.post<AuthResponseDto>(this._signUpUrl, {
      email,
      password,
      returnSecureToken: true
    });
  }

  public login(email: string, password: string): Observable<UserDto> {
    return this._http.post<AuthResponseDto>(this._signInUrl, {
      email,
      password,
      returnSecureToken: true
    });
  }

  public autoLogin(): AuthenticateSuccess | { type: string } {
    const loadedUser = JSON.parse(localStorage.getItem('userData'));

    if (!loadedUser) {
      return this._noUserAction;
    }

    loadedUser.token = loadedUser._token;
    const expirationDate = new Date(loadedUser._tokenExpirationDate).getTime() - new Date().getTime() ;
    this._autoLogout(expirationDate);
    return new AuthActions.AuthenticateSuccess({...loadedUser});
  }

  public logout(): void {
    localStorage.removeItem('userData');

    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
    }
  }

  public handleError(errorRes: HttpErrorResponse): Observable<AuthenticateFail> {
    let errorMessage = 'An unknown error occurred !';
    if (!errorRes.error || !errorRes.error.error) {
      return of(new AuthActions.AuthenticateFail(errorRes.message));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists !';
        break;
      case 'INVALID_PASSWORD':
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Invalid credentials !';
        break;
      default:
        errorMessage = `Something went wrong: ${errorMessage}`;
    }

    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

  public handleAuthentication(userResponse: UserDto): AuthenticateSuccess {
    const user = this._userBuilder.build(userResponse);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess(user);
  }

  private _autoLogout(expirationDuration: number): void {
    this._tokenExpirationTimer = setTimeout(() => this._store.dispatch(new AuthActions.Logout()), expirationDuration);
  }
}
