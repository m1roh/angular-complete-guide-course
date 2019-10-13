import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { AuthResponseDto } from '../../models/auth-response-dto';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { UserDto } from '../../models/user.dto';
import { UserBuilder } from '../../models/user-builder';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$ = new BehaviorSubject<User>(null);

  private _firebaseAppKey = 'AIzaSyBo-5SvU7f_pxMNLLoVUqUOtIonAW5XQas';
  private _signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private _signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private _tokenExpirationTimer: number;

  constructor(private _http: HttpClient, private _router: Router, private _userBuilder: UserBuilder) { }

  public signUp(email: string, password: string): Observable<UserDto> {
    return this._http.post<AuthResponseDto>(`${this._signUpUrl}${this._firebaseAppKey}`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this._handleError),
      tap((userResponse: UserDto) => this._handleAuthentication(userResponse))
    );
  }

  public login(email: string, password: string): Observable<UserDto> {
    return this._http.post<AuthResponseDto>(`${this._signInUrl}${this._firebaseAppKey}`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this._handleError),
      tap((userResponse: UserDto) => this._handleAuthentication(userResponse))
    );
  }

  public autoLogin(): void {
    const loadedUser = JSON.parse(localStorage.getItem('userData'));

    if (!loadedUser) {
      return;
    }

    loadedUser.token = loadedUser._token;
    const expirationDate = new Date(loadedUser._tokenExpirationDate).getTime() - new Date().getTime() ;
    this._autoLogout(expirationDate);
    this.user$.next(loadedUser);
  }

  public logout(): void {
    this.user$.next(null);
    localStorage.removeItem('userData');

    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
    }

    this._router.navigate(['/auth']);
  }

  private _autoLogout(expirationDuration: number): void {
    this._tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  private _handleError(errorRes: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred !';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorRes);
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

    return throwError(errorMessage);
  }

  private _handleAuthentication(userResponse: UserDto): void {
    this._autoLogout(+userResponse.expiresIn * 1000);

    const user = this._userBuilder.build(userResponse);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user$.next(user);
  }
}
