import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subject } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;

  private _destroy$: Subject<any> = new Subject<any>();

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.user$.subscribe((user: User) => this.isAuthenticated = !!user);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onLogout(): void {
    this._authService.logout();
  }
}
