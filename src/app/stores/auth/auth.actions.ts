import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const LOGIN_START = '[Auth] Login Start';
export const LOGOUT = '[Auth] Logout';
export const SIGNUP_START = '[Auth] Singup Start';

export class AuthenticateSuccess implements Action {
  public readonly type = AUTHENTICATE_SUCCESS;

  constructor(public payload: User) {}
}

export class Logout implements Action {
  public readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
  public readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  public readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  public readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  public readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | AutoLogin
  | AuthenticateSuccess
  | AuthenticateFail
  | ClearError
  | LoginStart
  | Logout
  | SignupStart;
