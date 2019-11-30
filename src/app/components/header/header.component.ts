import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subject } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../stores/root/app.reducer';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;

  private _destroy$: Subject<any> = new Subject<any>();

  constructor(private _authService: AuthService,
              private _store: Store<fromRoot.AppState>) {}

  ngOnInit(): void {
    this._store.select('auth').pipe(
      takeUntil(this._destroy$),
      map(authState => authState.user)
    ).subscribe((user: User) => this.isAuthenticated = !!user);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onLogout(): void {
    this._authService.logout();
  }
}
