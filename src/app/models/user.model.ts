export class User {
  public email: string;
  public id: string;
  private _token: string;
  private _tokenExpirationDate: Date;

  public get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }

  public set token(token: string) {
    this._token = token;
  }

  public set tokenExpirationDate(tokenExpirationDate: Date) {
    this._tokenExpirationDate = tokenExpirationDate;
  }
}
