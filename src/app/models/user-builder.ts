import { Injectable } from '@angular/core';
import { UserDto } from './user.dto';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserBuilder {
  public build(response: UserDto): User {
    if (!response) {
      return null;
    }

    const model = new User();

    model.email = response.email;
    model.id = response.localId;
    model.token = response.idToken;
    model.tokenExpirationDate = this._buildTokenExpirationDate(response.expiresIn);

    return model;
  }

  private _buildTokenExpirationDate(expirationDate: string): Date {
    return new Date(
      new Date().getTime() + (+expirationDate * 1000)
    );
  }
}
