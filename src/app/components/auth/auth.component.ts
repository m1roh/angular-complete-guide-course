import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Store } from '@ngrx/store';

import * as AuthActions from '../../stores/auth/auth.actions';
import * as fromAuth from '../../stores/auth/auth.reducer';
import * as fromRoot from '../../stores/root/app.reducer';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../../directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) public alertHost: PlaceholderDirective;

  public isLoginMode = true;
  public isLoading = false;
  public authForm: FormGroup;
  public error: string = null;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _cfr: ComponentFactoryResolver,
    private _formBuilder: FormBuilder,
    private _store: Store<fromRoot.AppState>) {}

  ngOnInit(): void {
    this._initForm();
    this._initAuthStore();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(): void {
    this.isLoading = true;
    const { email, password } = this.authForm.value;

    if (this.isLoginMode) {
      this._store.dispatch(new AuthActions.LoginStart({email, password}));
    } else {
      this._store.dispatch(new AuthActions.SignupStart({ email, password }));
    }
  }

  private _initAuthStore(): void {
    this._store.select('auth').pipe(takeUntil(this._destroy$)).subscribe((authState: fromAuth.State) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this._showErrorAlert(this.error);
      }
    });
  }

  private _initForm(): void {
    this.authForm = this._formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(8), Validators.required]]
    });
  }

  private _showErrorAlert(message: string): void {
    const alertComponentFactory = this._cfr.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    componentRef.instance.message = message;
    componentRef.instance.close.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this._store.dispatch(new AuthActions.ClearError());
      hostViewContainerRef.clear();
    });
  }
}
