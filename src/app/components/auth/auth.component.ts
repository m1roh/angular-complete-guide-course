import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, Subject } from 'rxjs';
import { UserDto } from '../../models/user.dto';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../../directives/placeholder.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false }) public alertHost: PlaceholderDirective;

  public isLoginMode = true;
  public isLoading = false;
  public authForm: FormGroup;
  public error: string = null;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _authService: AuthService,
    private _cfr: ComponentFactoryResolver,
    private _formBuilder: FormBuilder,
    private _router: Router) {}

  ngOnInit(): void {
    this._initForm();
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
    let authObs: Observable<UserDto>;

    if (this.isLoginMode) {
      authObs = this._authService.login(email, password);
    } else {
      authObs = this._authService.signUp(email, password);
    }

    authObs.subscribe(
      () => {
        this.isLoading = false;
        this._router.navigate(['/recipes']);
      },
      (errorMessage: string) => {
        this.isLoading = false;
        this.error = errorMessage;
        this._showErrorAlert(errorMessage);
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
    componentRef.instance.close.pipe(takeUntil(this._destroy$)).subscribe(() => hostViewContainerRef.clear());
  }
}
