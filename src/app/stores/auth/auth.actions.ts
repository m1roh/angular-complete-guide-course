import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
  public readonly type = LOGIN;

  constructor(
    public payload: {
      email: string;
      id: string;
      token: string;
      tokenExpirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  public readonly type = LOGOUT;
}

export type AuthActions =
  | Login
  | Logout;
